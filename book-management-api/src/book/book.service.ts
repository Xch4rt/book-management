import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly dbService: PrismaService) { }

  private readonly logger = new Logger(BookService.name);

  async create(createBookDto: CreateBookDto) {
    try {
      const { authorIds, datePublished, description, name, userId } = createBookDto;

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
    try {
      const books = await this.dbService.books.findMany({
        where: {
          isActive: true
        },
        include: {
          bookAuthors: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  birthDay: true,
                  birthPlace: true
                }
              }
            }
          }
        }
      });

      if (!books) {
        this.logger.error("There is not books to list");
        throw new HttpException("There is not books to list", 404);
      }

      return {
        status: 'success',
        message: 'List of books',
        data: {
          books
        }
      }

    } catch (error) {
      this.logger.error("There is an error with the request", error);
      throw new HttpException("There is an error with the request", 500);
    }
  }

  async findOne(id: number) {
    try {
      const book = await this.dbService.books.findUnique({
        where: {
          id
        },
        include: {
          bookAuthors: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  birthDay: true,
                  birthPlace: true
                }
              }
            }
          }
        }
      });

      if (!book) {
        this.logger.error("There is not books to list");
        throw new HttpException("There is not books to list", 404);
      }


      return {
        status: 'success',
        message: 'List of books',
        data: {
          book
        }
      }
    } catch (error) {
      this.logger.error("There is an error with the request", error);
      throw new HttpException("There is an error with the request", 500);
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const { name, description, datePublished } = updateBookDto;


      const updatedBook = await this.dbService.books.update({
        where: { id },
        data: {
          name,
          description,
          datePublished,
          updatedAt: new Date()
        },
      });

      return {
        status: 'success',
        message: 'Book updated Successfully',
        data: {
          updatedBook
        }
      };
    } catch (error) {
      this.logger.error("There is an error with the request", error);
      throw new HttpException("There is an error with the request", 500);
    }
  }

  async remove(id: number) {
    try {
      const updatedBook = await this.dbService.books.update({
        where: { id },
        data: {
          isActive: false,
          updatedAt: new Date()
        },
      });

      return {
        status: 'success',
        message: 'Book deleted successfully',
        data: {
          updatedBook
        }
      };
    } catch (error) {
      this.logger.error("There is an error with the request", error);
      throw new HttpException("There is an error with the request", 500);
    }
  }
}
