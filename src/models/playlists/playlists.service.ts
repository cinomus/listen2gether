import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Schema } from 'mongoose';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';
import { v4 as uuidv4 } from 'uuid';
import { User, UserDocument } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { UserPlaylistDto } from './dto/user.dto';
import * as mongoose from 'mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { PlaylistInterface } from './interfaces/playlistInterface';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import * as Http from 'http';

@Injectable()
export class PlaylistsService {
  constructor(
    private usersService: UsersService,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreatePlaylistDto) {
    const user = await this.userModel.findById(dto.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    const playlists = await this.playlistModel.find({
      user: user._id,
    });
    const playlistsWithThisName = playlists.filter((playlist) => {
      if (playlist.name === dto.name) return playlist;
    });
    if (playlistsWithThisName.length !== 0) {
      throw new HttpException(
        'Плейлист с таким названием уже существует.',
        400,
      );
    }

    return this.playlistModel.create({
      user: user._id,
      name: dto.name,
      link: uuidv4(),
      tracks: [],
    });
  }

  async getPlaylists() {
    try {
      return this.playlistModel.find();
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id: string) {
    try {
      return await this.playlistModel.findByIdAndDelete(id);
    } catch (e) {
      throw new HttpException(
        'Ошибка при удалении плейлиста.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  //не знаю почему но сработал только такой способ

  async getUserPlaylists(id: ObjectId): Promise<Playlist[]> {
    console.log(id);
    const playlists = await this.playlistModel.find({
      user: id,
    });
    // .populate('user'); хоть в схеме стоит objectId, а не User, но оно энивей подтягивает пользователя из другой бд ХЗ ПОЧЕМУ ХЗ КАК видимо я дурачок
    if (playlists.length === 0)
      throw new HttpException(
        'У данного пользователя не создано ни одного плейлиста.',
        HttpStatus.BAD_REQUEST,
      );

    return playlists;
  }

  async getPlaylistByUniqueLink(link: string): Promise<Playlist[] | string> {
    const playlist = await this.playlistModel.find({
      link: link,
    });
    console.log('playlists', playlist);
    if (playlist.length === 0)
      throw new HttpException(
        'Неправильная ссылка на плейлист.',
        HttpStatus.BAD_REQUEST,
      );

    return playlist;
  }

  async addTrack(
    receivedTrack: Track,
    receivedPlaylistId: ObjectId,
  ): Promise<Playlist> {
    if (!receivedTrack || !receivedPlaylistId) {
      throw new HttpException(
        'Не переданны нужные параметры',
        HttpStatus.BAD_REQUEST,
      );
    }
    const track: Track = await this.trackModel.create(receivedTrack);
    const playlist = await this.playlistModel.findOne({
      _id: receivedPlaylistId,
    });

    playlist.tracks.push(track);
    return playlist.save();
  }

  async removeTrack(
    receivedTrackId: ObjectId,
    receivedPlaylistId: ObjectId,
  ): Promise<Playlist> {
    try {
      await this.trackModel.deleteOne({ _id: receivedTrackId });
      //запихиваем trackId, потому что в бд плейлиста записаны id, а не сами объекты треков
      return this.playlistModel.findOneAndUpdate(
        { _id: receivedPlaylistId },
        {
          $pull: {
            tracks: receivedTrackId,
          },
        },
      );
    } catch (e) {
      console.log(e);
    }
  }
}
