import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({
    example: '1233knaskio1p-asdasd',
    description: 'Id пользователя',
  })
  readonly id: string;
  @ApiProperty({ example: 'Using bugs', description: 'Причина блокировки.' })
  readonly banReason: string;
}
