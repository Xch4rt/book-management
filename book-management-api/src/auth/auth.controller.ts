import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return await this.authService.login(loginAuthDto);
  }

  @Post('/register')
  async register(@Body() registerAuthDto: LoginAuthDto ) {
    return await this.authService.register(registerAuthDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return await this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.authService.remove(+id);
  }
}
