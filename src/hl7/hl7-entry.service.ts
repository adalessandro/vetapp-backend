import { parse as dateFormatParse } from 'date-format-parse';
import { Injectable, Inject } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateHL7EntryDto } from './dto/create-hl7entry.dto';
import { HL7Entry } from './entities/hl7.entity';
import { joinDict } from 'src/common/lib/helpers';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const hl7Standard = require('hl7-standard');

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

    hl7Entry.resultAge = entry.get('OBX.5', 3);

    hl7Entry.wbcValue = entry.get('OBX.5', 6);
    hl7Entry.wbcUnit = entry.get('OBX.6', 6);
    hl7Entry.wbcRange = entry.get('OBX.7', 6);

    hl7Entry.lymPValue = entry.get('OBX.5', 7);
    hl7Entry.lymPUnit = entry.get('OBX.6', 7);
    hl7Entry.lymPRange = entry.get('OBX.7', 7);

    hl7Entry.granPValue = entry.get('OBX.5', 8);
    hl7Entry.granPUnit = entry.get('OBX.6', 8);
    hl7Entry.granPRange = entry.get('OBX.7', 8);

    hl7Entry.midPValue = entry.get('OBX.5', 9);
    hl7Entry.midPUnit = entry.get('OBX.6', 9);
    hl7Entry.midPRange = entry.get('OBX.7', 9);

    hl7Entry.lymNValue = entry.get('OBX.5', 10);
    hl7Entry.lymNUnit = entry.get('OBX.6', 10);
    hl7Entry.lymNRange = entry.get('OBX.7', 10);

    hl7Entry.granNValue = entry.get('OBX.5', 11);
    hl7Entry.granNUnit = entry.get('OBX.6', 11);
    hl7Entry.granNRange = entry.get('OBX.7', 11);

    hl7Entry.midNValue = entry.get('OBX.5', 12);
    hl7Entry.midNUnit = entry.get('OBX.6', 12);
    hl7Entry.midNRange = entry.get('OBX.7', 12);

    hl7Entry.rbcValue = entry.get('OBX.5', 13);
    hl7Entry.rbcUnit = entry.get('OBX.6', 13);
    hl7Entry.rbcRange = entry.get('OBX.7', 13);

    hl7Entry.hgbValue = entry.get('OBX.5', 14);
    hl7Entry.hgbUnit = entry.get('OBX.6', 14);
    hl7Entry.hgbRange = entry.get('OBX.7', 14);

    hl7Entry.hctValue = entry.get('OBX.5', 15);
    hl7Entry.hctUnit = entry.get('OBX.6', 15);
    hl7Entry.hctRange = entry.get('OBX.7', 15);

    hl7Entry.mcvValue = entry.get('OBX.5', 16);
    hl7Entry.mcvUnit = entry.get('OBX.6', 16);
    hl7Entry.mcvRange = entry.get('OBX.7', 16);

    hl7Entry.mchValue = entry.get('OBX.5', 17);
    hl7Entry.mchUnit = entry.get('OBX.6', 17);
    hl7Entry.mchRange = entry.get('OBX.7', 17);

    hl7Entry.mchcValue = entry.get('OBX.5', 18);
    hl7Entry.mchcUnit = entry.get('OBX.6', 18);
    hl7Entry.mchcRange = entry.get('OBX.7', 18);

    hl7Entry.rdwcvValue = entry.get('OBX.5', 19);
    hl7Entry.rdwcvUnit = entry.get('OBX.6', 19);
    hl7Entry.rdwcvRange = entry.get('OBX.7', 19);

    hl7Entry.rdwsdValue = entry.get('OBX.5', 20);
    hl7Entry.rdwsdUnit = entry.get('OBX.6', 20);
    hl7Entry.rdwsdRange = entry.get('OBX.7', 20);

    hl7Entry.pltValue = entry.get('OBX.5', 21);
    hl7Entry.pltUnit = entry.get('OBX.6', 21);
    hl7Entry.pltRange = entry.get('OBX.7', 21);

    hl7Entry.mpvValue = entry.get('OBX.5', 22);
    hl7Entry.mpvUnit = entry.get('OBX.6', 22);
    hl7Entry.mpvRange = entry.get('OBX.7', 22);

    hl7Entry.pdwValue = entry.get('OBX.5', 23);
    hl7Entry.pdwUnit = entry.get('OBX.6', 23);
    hl7Entry.pdwRange = entry.get('OBX.7', 23);

    hl7Entry.pctValue = entry.get('OBX.5', 24);
    hl7Entry.pctUnit = entry.get('OBX.6', 24);
    hl7Entry.pctRange = entry.get('OBX.7', 24);

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
}
