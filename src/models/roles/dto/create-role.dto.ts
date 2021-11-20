import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Роль пользователя' })
  readonly value: string;
  @ApiProperty({ example: 'Administrator', description: 'Описание роли' })
  readonly description: string;
}
