import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [PrismaModule, AuthModule, AuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
