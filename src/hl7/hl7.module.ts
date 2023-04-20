import { Module } from '@nestjs/common';
import { DatabasesModule } from '../databases/databases.module';
import { HL7Providers } from './hl7.providers';
import { HL7EntryService } from './hl7-entry.service';
import { HL7Service } from './hl7.service';
import { HL7Controller, HL7EntryController } from './hl7.controller';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [DatabasesModule, EventsModule],
  controllers: [HL7Controller, HL7EntryController],
  providers: [...HL7Providers, HL7EntryService, HL7Service],
  exports: [HL7EntryService, HL7Service],
})
export class Hl7Module {
  onModuleInit;
}
