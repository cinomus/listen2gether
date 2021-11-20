import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TokenDocument = Token & Document;

@Schema({ versionKey: false })
export class Token {
  @ApiProperty({
    example: 'user123',
    description: 'Пользователь, которому принадлежит токен',
  })
  @Prop({ required: true })
  user: string;
  @ApiProperty({ example: '123TokEn432', description: 'Refresh token' })
  @Prop({ required: true })
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
