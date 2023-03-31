import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabasesModule } from './databases/databases.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, DatabasesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
