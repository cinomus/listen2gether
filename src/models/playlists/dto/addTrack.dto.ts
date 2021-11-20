import { ApiProperty } from '@nestjs/swagger';
import { Track } from '../schemas/track.schema';
import { ObjectId } from 'mongoose';

export class AddTrackDto {
  @ApiProperty({
    example: 'nuasdo9svhua9901idagasdg',
    description: 'Объект трека, кторый необходимо добавить в плейлист.',
  })
  readonly track: Track;
  @ApiProperty({
    example: 'aidhfg789h270vfahdvo8adisv',
    description: 'Id плейлиста, в котором находится трек.',
  })
  readonly playlistId: ObjectId;
}
