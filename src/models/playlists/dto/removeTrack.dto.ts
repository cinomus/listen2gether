import { ApiProperty } from '@nestjs/swagger';
import { Track } from '../schemas/track.schema';
import { ObjectId } from 'mongoose';

export class RemoveTrackDto {
  @ApiProperty({
    example: 'nuasdo9svhua9901idagasdg',
    description: 'Id трека, который необходимо удалить из плейлиста.',
  })
  readonly trackId: ObjectId;
  @ApiProperty({
    example: 'aidhfg789h270vfahdvo8adisv',
    description: 'Id плейлиста, в котором находится трек.',
  })
  readonly playlistId: ObjectId;
}
