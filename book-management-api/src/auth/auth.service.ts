import { HttpException, Injectable, Logger } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor (private readonly dbService: PrismaService) {}

  private readonly logger = new Logger(AuthService.name);

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const {username, password} = loginAuthDto;

      if (password.length < 8) {
        this.logger.error("Password lenght < 8");
        throw new HttpException("Password does not match the required lenght", 400);
      }

      const user = await this.dbService.users.findUnique({
        where: {
          username: username,
          isActive: true
        }
      });

      if (!user) {
        this.logger.error("Username does not exists");
        throw new HttpException("Username does not exists", 404);
      }

      const passwordsMatch = await this.isPasswordMatch(user.password, password);

      if (!passwordsMatch) {
        this.logger.error("Wrong credentials");
        throw new HttpException("Wrong Credentials!", 401)
      }
      
      return {
        status: 'success',
        message: 'Authorized',
        data: {
          id: user.id,
          username: user.username
        }
      }

    } catch (error) {
      this.logger.error("There is an error with the request", error);
      throw new HttpException("There is an error with the request", 500);
    }
  }

  async register(registerAuthDto: LoginAuthDto) {
    const {username, password} = registerAuthDto;

    try {
      if (password.length < 8) {
        this.logger.error("Password lenght < 8");
        throw new HttpException("Password does not match the required lenght", 400);
      }
  
      const user = await this.dbService.users.findUnique({
        where: {
          username: username,
          isActive: true
        }
      });
  
      if (user) {
        this.logger.error("Username already exists");
        throw new HttpException("Username already exists", 400);
      }
  
      const pwdHashed = await this.encrypt(password);
      const createUser = await this.dbService.users.create({
        data: {
          username: username,
          password: pwdHashed
        }
      });

      return {
        status: 'success',
        message: 'User created successfully',
        data: {
          id: user.id,
          username: user.username,
          createdAt: user.createdAt
        }
      }
    } catch (error) {
      this.logger.error('There is an error with the request', error);
      throw new HttpException("There is an error with the request", 500);
    }


  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    try {
      const { username, password } = updateAuthDto;

      const user = await this.dbService.users.findUnique({
        where: {
          id: id,
          isActive: true
        }
      });

      if (!user) {
        this.logger.error("Not found");
        throw new HttpException("Not found", 404);
      }

      if (username) {
        user.username = username;
      }

      if (password) {
        if (password.length < 8) {
          this.logger.error("Password length < 8");
          throw new HttpException("Password does not match the required length", 400);
        }
        const pwdHashed = await this.encrypt(password);
        user.password = pwdHashed;
      }

      const updatedUser = await this.dbService.users.update({
        where: {
          id: id,
        },
        data: {
          username: user.username,
          password: user.password,
          updatedAt: new Date()
        },
      });

      return {
        status: 'success',
        message: 'User updated successfully',
        data: {
          id: updatedUser.id,
          username: updateAuthDto.username,
          updatedAt: updateAuthDto.username
        }
      }

    } catch (error) {
      this.logger.error("There is an error with the request", error);
      throw new HttpException("There is an error with the request", 500);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.dbService.users.findUnique({
        where: {
          id: id,
          isActive: true,
        },
      });

      if (!user) {
        this.logger.error("User does not exist");
        throw new HttpException("User does not exist", 404);
      }

      const deletedUser = await this.dbService.users.update({
        where: {
          id: id,
        },
        data: {
          isActive: false, 
          updatedAt: new Date()
        },
      });

      return {
        status: 'success',
        message: `User ${id} removed successfully`,
        data: {
          id: deletedUser.id,
          username: deletedUser.username,
          updatedAt: deletedUser.updatedAt
        },
      };

    } catch (error) {
      this.logger.error("There is an error with the request", error);
      throw new HttpException("There is an error with the request", 500);
    }
  }

  private async encrypt(password: string) : Promise<string> {
    return await argon2.hash(password);
  }

  private async isPasswordMatch(userPassword: string, loginPassword: string) : Promise<Boolean>{
    return await argon2.verify(userPassword, loginPassword);
  }
}
