import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Playlist } from './playlist.schema';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TrackDocument = Track & Document;

@Schema({ versionKey: false })
export class Track {
  @ApiProperty({ example: 'фкешые', description: 'Исполнитель.' })
  @Prop()
  artist: string;
  @ApiProperty({ example: 'password123', description: 'Название трека.' })
  @Prop()
  title: string;
  @ApiProperty({
    example: 'password123',
    description: 'Ссылка на обложку трека.',
  })
  @Prop()
  pictureUrl: string;
  @ApiProperty({
    example: 'password123',
    description: 'Ссылка на аудио трека.',
  })
  @Prop()
  audioUrl: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
