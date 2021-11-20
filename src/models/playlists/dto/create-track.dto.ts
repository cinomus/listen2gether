import { Playlist } from '../schemas/playlist.schema';

export class CreateTrackDto {
  readonly artist: string;
  readonly title: string;
  readonly picture: string;
  readonly audio: string;
}
