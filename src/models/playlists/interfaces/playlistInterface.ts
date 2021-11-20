import { ObjectId } from 'mongoose';
import { UserInPlaylistInterface } from './userInPlaylistInterface';
import { Track } from '../schemas/track.schema';

export interface PlaylistInterface {
  _id: ObjectId;
  link: string;
  name: string;
  user: UserInPlaylistInterface;
  tracks: Track[];
}
