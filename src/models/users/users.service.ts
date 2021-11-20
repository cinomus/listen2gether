import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import * as bcrypt from 'bcrypt';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private rolesService: RolesService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const userRole = await this.rolesService.getRoleByValue('User');
    const createdUser = new this.userModel({
      ...userDto,
    });
    createdUser.roles.push(userRole);
    return createdUser.save();
  }

  async setCurrentRefreshToken(refreshToken: string, username: string) {
    // const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10); todo: мб надо это брать вообще???
    await this.userModel.findOneAndUpdate(
      { username: username },
      {
        refreshToken: refreshToken,
      },
    );
  }

  async removeRefreshToken(refreshToken) {
    return this.userModel.findOneAndUpdate(
      { refreshToken: refreshToken },
      {
        refreshToken: null,
      },
    );
  }

  async findByRefreshToken(refreshToken: string): Promise<User> {
    console.log('refres', refreshToken);
    return this.userModel.findOne({ refreshToken: refreshToken });
  }

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await this.userModel
      .findOne({ username: username })
      .populate('roles');
    if (!user) {
      throw new HttpException(
        {
          message: `Пользователь ${username} не найден.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userModel.findById(addRoleDto.id).populate('roles');
    const role = await this.rolesService.getRoleByValue(addRoleDto.value);

    if (role && user) {
      const roles = user.roles.filter((userRole) => {
        if (userRole.equals(role)) {
          return userRole;
        }
      });
      if (roles.length !== 0) {
        throw new HttpException(
          'У пользователя уже есть данная роль',
          HttpStatus.BAD_REQUEST,
        );
      }

      user.roles.push(role);
      user.save();
      return user;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.BAD_REQUEST,
    );
  }

  async banUser(banUserDto: BanUserDto) {
    const user = await this.userModel.findById(banUserDto.id);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
    if (user.banned === true) {
      throw new HttpException(
        'Пользователь уже заблокирован',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.banned = true;
    user.banReason = banUserDto.banReason;

    user.save();
    return user;
  }
}
