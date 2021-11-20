import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type RoleDocument = Role & Document;

@Schema({ versionKey: false })
export class Role {
  equals(role: Role): any {
    throw new Error('Method not implemented.');
  }
  @ApiProperty({ example: 'ADMIN', description: 'Роль польователя' })
  _id: ObjectId;
  @ApiProperty({ example: 'ADMIN', description: 'Роль польователя' })
  @Prop({ required: true })
  value: string;
  @ApiProperty({ example: 'Administrator', description: 'Описание роли' })
  @Prop({ required: true })
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
