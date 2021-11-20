import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({
    example: 'hskldvk12734ijkdns78',
    description: 'Id пользователя.',
  })
  readonly id: string;
  @ApiProperty({
    example: 'Administrator',
    description: 'Название роли, которую нужно добавить.',
  })
  readonly value: string;
}
