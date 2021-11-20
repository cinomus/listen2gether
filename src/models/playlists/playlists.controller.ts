import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from '../../authentication/jwt-auth.guard';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/schemas/user.schema';
import { Playlist } from './schemas/playlist.schema';
import { AddTrackDto } from './dto/addTrack.dto';
import { RemoveTrackDto } from './dto/removeTrack.dto';

@ApiTags('Playlists')
@UseGuards(JwtAuthGuard)
@Controller('playlists')
export class PlaylistsController {
  constructor(private playlistsService: PlaylistsService) {}
  @ApiOperation({ summary: 'Получение всех плейлистов' })
  @ApiResponse({ status: 200, type: [Playlist] })
  @Get()
  async getPlaylists() {
    return this.playlistsService.getPlaylists();
  }
  @ApiOperation({ summary: 'Получение плейлиста по уникальной ссылке' })
  @ApiResponse({ status: 200, type: Playlist })
  @ApiParam({
    name: 'link',
    type: String,
    description: 'link нужного плейлиста',
  })
  @Get(':link')
  async getPlaylistByUniqueLink(@Param() { link }) {
    return this.playlistsService.getPlaylistByUniqueLink(link);
  }
  @ApiOperation({ summary: 'Создание плейлиста' })
  @ApiResponse({ status: 200, type: Playlist })
  //готово
  @Post('create')
  async create(
    @Body() createPlaylistDto: CreatePlaylistDto,
  ): Promise<Playlist> {
    console.log('create');
    return this.playlistsService.create(createPlaylistDto);
  }

  @ApiOperation({ summary: 'Удаление плейлиста' })
  @ApiResponse({ status: 200, type: Playlist })
  //готово
  @Post('delete')
  async delete(@Body() { id }): Promise<Playlist> {
    return await this.playlistsService.delete(id);
  }

  @ApiOperation({
    summary: 'Получение плейлистов конкретного пользователя по его id',
  })
  @ApiResponse({ status: 200, type: [Playlist] })
  //готово
  @Post('byUserId')
  async getPlaylistsByUserId(@Body() { id }): Promise<Playlist[]> {
    return this.playlistsService.getUserPlaylists(id);
  }

  @ApiOperation({ summary: 'Добавление трека в плейлист' })
  @ApiResponse({ status: 200, type: [Playlist] })
  //готово
  @Post('addTrack')
  async addTrack(
    @Body() { track, playlistId }: AddTrackDto,
  ): Promise<Playlist> {
    return await this.playlistsService.addTrack(track, playlistId);
  }

  @ApiOperation({ summary: 'Удаление трека из плейлиста' })
  @ApiResponse({ status: 200, type: [Playlist] })
  //готово
  @Post('removeTrack')
  async removeTrack(
    @Body() { trackId, playlistId }: RemoveTrackDto,
  ): Promise<Playlist> {
    return this.playlistsService.removeTrack(trackId, playlistId);
  }
}
