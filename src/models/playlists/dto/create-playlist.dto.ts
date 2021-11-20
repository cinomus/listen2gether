import { Playlist } from '../schemas/playlist.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { UserPlaylistDto } from './user.dto';
import mongoose, { ObjectId } from 'mongoose';
import { Track } from '../schemas/track.schema';
import { User } from '../../users/schemas/user.schema';

export class CreatePlaylistDto {
  @ApiProperty({
    example: 'nuasdo9svhua9901i',
    description: 'Пользователь, которому принадлежит плейлист.',
  })
  readonly id: string;
  @ApiProperty({
    example: 'default',
    description: 'Название плейлиста.',
  })
  readonly name: string;
}
