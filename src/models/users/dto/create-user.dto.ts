import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'userLogin', description: 'Логин пользователя' })
  readonly username: string;
  @ApiProperty({ example: 'password123', description: 'Пароль пользователя' })
  readonly password: string;
}
