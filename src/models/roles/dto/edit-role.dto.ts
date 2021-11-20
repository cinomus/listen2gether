import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class EditRoleDto {
  @ApiProperty({ example: 'egn132fnjsadf1', description: 'id роли' })
  readonly id: ObjectId;
  @ApiProperty({ example: 'ADMIN', description: 'Роль пользователя' })
  readonly value: string;
  @ApiProperty({ example: 'Administrator', description: 'Описание роли' })
  readonly description: string;
}
