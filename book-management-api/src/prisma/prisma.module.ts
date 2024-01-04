import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  controllers: [PrismaService],
  providers: [PrismaService],
})
export class PrismaModule {}
