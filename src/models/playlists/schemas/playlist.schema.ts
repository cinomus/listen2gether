import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Track } from './track.schema';
import { User } from '../../users/schemas/user.schema';

export type PlaylistDocument = Playlist & Document;

@Schema({ versionKey: false })
export class Playlist {
  @ApiProperty({
    example: '{user}',
    description: 'Юзер которому принадлежит плейлист',
  })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: ObjectId;
  @ApiProperty({ example: 'default', description: 'название плэйлиста' })
  @Prop({ required: true })
  name: string;
  @ApiProperty({
    example: '1243klmfd-dsgf123',
    description: 'ссылка на плейлист',
  })
  @Prop({ required: true })
  link: string;
  @ApiProperty({ example: '{track}', description: 'трэки в плейлисте' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
  tracks: Track[];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
