import { Exclude, Type } from 'class-transformer';
import { Role } from '../../roles/schemas/role.schema';
import { Playlist } from '../../playlists/schemas/playlist.schema';
import { User } from '../schemas/user.schema';
import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class UserResp {
  @ApiProperty({
    example: 'userLogins, email@example.com',
    description: 'Логин пользователя',
  })
  username: string;
  @ApiProperty({
    example: '12344dsvsas14gs',
    description: 'Id пользователя в системе.',
  })
  _id: ObjectId;
  @ApiProperty({
    example: 'true',
    description: 'Значение true or false блокировки пользователя',
  })
  banned: boolean;
  @ApiProperty({
    example: 'User',
    description: 'Роли доступные пользователю.',
  })
  roles: Role[];
  @ApiProperty({
    example: '123fsdfahfhadgf34asfd',
    description: 'Плейлисты пользователя.',
  })
  playlists: Playlist[];

  @Exclude()
  password: string;
  @Exclude()
  reg_time: Date;
  @Exclude()
  refreshToken: string;
  @Exclude()
  oldestAccessTokens: string[];

  constructor(partial: Partial<UserResp>) {
    Object.assign(this, partial);
  }
}

export class UsersResponse {
  @Type(() => UserResp)
  users: User[];

  constructor() {}
}
