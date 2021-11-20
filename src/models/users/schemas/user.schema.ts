import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Role } from '../../roles/schemas/role.schema';

export type UserDocument = User & Document;
@Schema({ versionKey: false })
export class User {
  _id: ObjectId;
  @ApiProperty({
    example: 'userLogins, email@example.com',
    description: 'Логин пользователя',
  })
  @Prop({ unique: true, required: true })
  username: string;
  @ApiProperty({ example: 'password123', description: 'Пароль пользователя' })
  @Prop({ required: true })
  password: string;
  @ApiProperty({ example: 'true', description: 'Забанен пользователь или нет' })
  @Prop({ default: false })
  banned: boolean;
  @ApiProperty({
    example: 'Using bugs',
    description: 'Причина блокировки пользователя',
  })
  @Prop()
  banReason: string;
  @Prop()
  oldestAccessTokens: string[];
  @Prop()
  refreshToken: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }] })
  // playlists: Playlist[];
  @Prop({ type: Date, default: Date.now })
  reg_time: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
