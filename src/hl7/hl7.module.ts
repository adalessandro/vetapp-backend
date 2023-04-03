import { Module } from '@nestjs/common';
import { DatabasesModule } from '../databases/databases.module';
import { HL7Providers } from './hl7.providers';
import { HL7Service } from './hl7.service';
import { HL7Controller } from './hl7.controller';

@Module({
  imports: [DatabasesModule],
  controllers: [HL7Controller],
  providers: [...HL7Providers, HL7Service],
  exports: [HL7Service],
})
export class Hl7Module {
  onModuleInit;
}
