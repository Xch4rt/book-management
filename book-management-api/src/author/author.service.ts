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
          birthDay: new Date(birthDay),
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
      const authors = await this.dbService.authors.findMany({
        where: {
          isActive: true
        }
      });
      return {
        status: 'success',
        message: 'Author created successfully',
        data: authors
      }
    } catch (error) {
      this.logger.error("There is an error with the request", error)
      throw new HttpException("There is an error with the request", 500)
    }
  }

  async findOne(id: number) {
    try {
      const author = await this.dbService.authors.findUnique({
        where: {
          id: id,
          isActive: true
        }
      })

    } catch (error) {
      this.logger.error("There is an error with the request", error);
      throw new HttpException("There is an error with the request", 500);
    }
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    try {
      const {name, birthDay, birthPlace} = updateAuthorDto;

      const existAuthor = await this.dbService.authors.findUnique({
        where: {
          id: id,
          isActive: true
        }
      });

      if (!existAuthor) {
        this.logger.error("Author does not exist");
        throw new HttpException("Author does not exist", 404);
      }

      const author = await this.dbService.authors.update({
        where: {
          id: id,
          isActive: true
        },
        data: {
          name: name,
          birthDay: new Date(birthDay),
          birthPlace: birthPlace,
          updatedAt: new Date()
        }
      });

      return {
        status: 'success',
        message: 'Author updated succesfully',
        data: {
          id: author.id,
          name: author.name,
          updatedAt: author.updatedAt
        }
      }

    } catch (error ) {
      this.logger.error("There is an error with the request", error);
      throw new HttpException("There is an error with the request", 500);
    }
  }

  async remove(id: number) {
    try {
      const existAuthor = await this.dbService.authors.findUnique({
        where: {
          id: id,
          isActive: true
        }
      });

      if (!existAuthor) {
        this.logger.error("Author does not exist");
        throw new HttpException("Author does not exist", 404);
      }

      const deleteAuthor = await this.dbService.authors.update({
        where: {
          id: id,
          isActive: true
        },
        data: {
          isActive: false,
          updatedAt: new Date()
        }
      })
    } catch (error) {
      this.logger.error("There is an error with the request", error);
      throw new HttpException("There is an error with the request", 500);
    }
  }
}
