import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './models/users/users.module';
import * as config from 'config';
import { AppController } from './app.controller';
import { RolesController } from './models/roles/roles.controller';
import { RolesModule } from './models/roles/roles.module';
// import { PlaylistService } from './modules/playlists/playlists.service';
import { PlaylistsController } from './models/playlists/playlists.controller';
import { PlaylistsModule } from './models/playlists/playlists.module';
import { AuthModule } from './authentication/auth.module';
import { AuthController } from './authentication/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PlaylistsService } from './models/playlists/playlists.service';

@Module({
  imports: [
    MongooseModule.forRoot(config.get('MONGO_URL')),
    UsersModule,
    RolesModule,
    PlaylistsModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController, PlaylistsController],
  providers: [],
})
export class AppModule {}
