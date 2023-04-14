import { DataSource } from 'typeorm';

const DB_HOST = process.env.DB_HOST || 'localhost';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: DB_HOST,
        port: 5432,
        username: 'postgres',
        password: 'changeme',
        database: 'vetappdb',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
