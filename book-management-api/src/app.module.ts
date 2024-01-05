import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [PrismaModule, AuthModule, AuthorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
