import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor (private readonly dbService: PrismaService) {}

  private readonly logger = new Logger(AuthorService.name);
  async create(createAuthorDto: CreateAuthorDto) {
    try {
      const {name, birthDay, birthPlace} = createAuthorDto;

      const author = await this.dbService.authors.create({
        data: {
          name: name,
          birthDay: birthDay,
          birthPlace: birthPlace
        }
      });

      return {
        status: 'success',
        message: 'Author created successfully',
        data: {
          id: author.id,
          name: author.name,
          createdAt: author.createdAt
        }
      }

    } catch (error) {
      this.logger.error("There is an error with the request", error);
      throw new HttpException("There is an error with the request", 500);
    }
  }

  async findAll() {
    try {
      
    } catch (error) {
      this.logger.error("There is an error with the request", error)
      throw new HttpException("There is an error with the request", 500)
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  async remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
