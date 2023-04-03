import { Module } from '@nestjs/common';
import { DatabasesModule } from '../databases/databases.module';
import { HL7Providers } from './hl7.providers';
import { HL7Service } from './hl7.service';

@Module({
  imports: [DatabasesModule],
  providers: [...HL7Providers, HL7Service],
  exports: [HL7Service],
})
export class Hl7Module {
  onModuleInit;
}
