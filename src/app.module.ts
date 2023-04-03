import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabasesModule } from './databases/databases.module';
import { AuthModule } from './auth/auth.module';
import { Hl7Module } from './hl7/hl7.module';

@Module({
  imports: [AuthModule, DatabasesModule, UsersModule, Hl7Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
