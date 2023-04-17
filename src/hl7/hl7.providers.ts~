import { DataSource } from 'typeorm';
import { HL7Entry, HL7Message } from './entities/hl7.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mllp = require('mllp-node');

const HL7_HOST = process.env.HL7_HOST || '127.0.0.1';
const HL7_PORT = process.env.HL7_PORT || 7777;

export const HL7Providers = [
  {
    provide: 'HL7_SERVER',
    useFactory: async () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const hl7Server = new mllp.MLLPServer(HL7_HOST, HL7_PORT, () => {});
      return hl7Server;
    },
  },
  {
    provide: 'HL7_ENTRY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(HL7Entry),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'HL7_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(HL7Message),
    inject: ['DATA_SOURCE'],
  },
];
