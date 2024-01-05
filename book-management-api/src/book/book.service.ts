import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor (private readonly dbService: PrismaService) {}

  private readonly logger= new Logger(BookService.name);

  async create(createBookDto: CreateBookDto) {
    try {
      const { authorIds, datePublished, description, name, userId} = createBookDto;

      const book = await this.dbService.books.create({
        data: {
          name: name,
          datePublished: new Date(datePublished),
          description: description,
          userBooks: {
            create: {
              user: {
                connect: {
                  id: userId
                }
              }
            }
          },
          bookAuthors: {
            create: authorIds.map((authorId) => ({
              author: {
                connect: {
                  id: authorId
                }
              }
            }))
          }
        }
      });

      return {
        status: 'success',
        message: 'Book created succesfully',
        data: {
          book
        }
      }
    } catch (error) {
      this.logger.error("There is an error with the request", error);
      throw new HttpException("There is an error with the request", 500);
    }
  }

  async findAll() {
    return `This action returns all book`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  async remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
