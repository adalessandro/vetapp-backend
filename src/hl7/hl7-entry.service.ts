import { parse as dateFormatParse } from 'date-format-parse';
import { Injectable, Inject } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateHL7EntryDto, HL7EntryExcelFileDto } from './dto/hl7entry.dto';
import { HL7Entry, hl7EntryValues } from './entities/hl7.entity';
import { joinDict, parseInterval } from 'src/common/lib/helpers';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { hl7Constants } from './hl7.constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const hl7Standard = require('hl7-standard');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const XlsxTemplate = require('xlsx-template');

@Injectable()
export class HL7EntryService {
  constructor(
    @Inject('HL7_ENTRY_REPOSITORY')
    private hl7EntryRepository: Repository<HL7Entry>,
  ) {}

  async create(createHL7EntryDto: CreateHL7EntryDto): Promise<HL7Entry> {
    const hl7Entry = new HL7Entry();
    const entry = new hl7Standard(createHL7EntryDto.payload);

    entry.transform();

    hl7Entry.patientName = joinDict(entry.get('PID.5'));
    hl7Entry.patientSex = entry.get('PID.8');
    hl7Entry.patientAlias = entry.get('PID.9');
    hl7Entry.patientRace = entry.get('PID.10');

    hl7Entry.observationDate = dateFormatParse(
      entry.get('OBR.7'),
      'YYYYMMDDHHmmss',
    );
    hl7Entry.observationCollector = entry.get('OBR.10');

    const resultAgeValue = entry.get('OBX.5', 3);
    const resultAgeUnit = entry.get('OBX.6', 3);
    hl7Entry.resultAge = parseInterval(resultAgeValue, resultAgeUnit);

    function getOBXTriplet(id, index) {
      hl7Entry[`${id}Value`] = parseFloat(
        entry.get('OBX.5', index).replace(',', '.'),
      );
      hl7Entry[`${id}Unit`] = entry.get('OBX.6', index);
      hl7Entry[`${id}Range`] = entry.get('OBX.7', index);
    }

    getOBXTriplet('wbc', 6);
    getOBXTriplet('lymP', 7);
    getOBXTriplet('granP', 8);
    getOBXTriplet('midP', 9);
    getOBXTriplet('lymN', 10);
    getOBXTriplet('granN', 11);
    getOBXTriplet('midN', 12);
    getOBXTriplet('rbc', 13);
    getOBXTriplet('hgb', 14);
    getOBXTriplet('hct', 15);
    getOBXTriplet('mcv', 16);
    getOBXTriplet('mch', 17);
    getOBXTriplet('mchc', 18);
    getOBXTriplet('rdwcv', 19);
    getOBXTriplet('rdwsd', 20);
    getOBXTriplet('plt', 21);
    getOBXTriplet('mpv', 22);
    getOBXTriplet('pdw', 23);
    getOBXTriplet('pct', 24);

    return this.hl7EntryRepository.save(hl7Entry);
  }

  async findAll(): Promise<HL7Entry[]> {
    return this.hl7EntryRepository.find();
  }

  async findOne(id: number): Promise<HL7Entry> {
    return this.hl7EntryRepository.findOneBy({ id: id });
  }

  async findOneBy(
    where: FindOptionsWhere<HL7Entry> | FindOptionsWhere<HL7Entry>[],
  ): Promise<HL7Entry> {
    return this.hl7EntryRepository.findOneBy(where);
  }

  async remove(id: number): Promise<void> {
    await this.hl7EntryRepository.delete(id);
  }

  async generateExcel(hl7Entry: HL7Entry): Promise<HL7EntryExcelFileDto> {
    const race = hl7Entry.patientRace.toLowerCase();
    const templateFilename = hl7Constants.excelTemplates[race];

    if (!templateFilename) {
      throw new Error(
        `Failed to load Excel template for patient race: ${race}`,
      );
    }

    const templateFile = await readFile(join(process.cwd(), templateFilename));
    const xlsxTemplate = new XlsxTemplate(templateFile);
    xlsxTemplate.substituteAll(hl7EntryValues(hl7Entry));

    const outputData = xlsxTemplate.generate();
    const date = new Date(hl7Entry.observationDate).toISOString().split('T')[0];

    return {
      file: Buffer.from(outputData, 'binary'),
      filename: `${date} - ${hl7Entry.patientAlias} - ${hl7Entry.patientName}.xlsx`,
    };
  }
}
