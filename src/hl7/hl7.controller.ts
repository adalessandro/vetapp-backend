import {
  Controller,
  Get,
  Res,
  Param,
  Delete,
  StreamableFile,
} from '@nestjs/common';
import { HL7Entry, HL7Message } from './entities/hl7.entity';
import { HL7Service } from './hl7.service';
import { HL7EntryService } from './hl7-entry.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Public } from '../auth/decorators/public.decorator';
import type { Response } from 'express';

@Controller('hl7')
export class HL7Controller {
  constructor(private readonly hl7Service: HL7Service) {}

  @Get()
  findAll(): Promise<HL7Message[]> {
    return this.hl7Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<HL7Message> {
    return this.hl7Service.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.hl7Service.remove(+id);
  }
}

@Controller('hl7-entry')
export class HL7EntryController {
  constructor(private readonly hl7EntryService: HL7EntryService) {}

  @Get()
  findAll(): Promise<HL7Entry[]> {
    return this.hl7EntryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<HL7Entry> {
    return this.hl7EntryService.findOne(+id);
  }

  @Public()
  @Get('excel/:id')
  getFile(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const excel = this.hl7EntryService.generateExcel(+id);
    res.set({
      'Content-Type': 'application/vnd.ms-excel',
      'Content-Disposition': `attachment; filename="${excel.filename}"`,
    });
    return new StreamableFile(excel.file);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.hl7EntryService.remove(+id);
  }
}
