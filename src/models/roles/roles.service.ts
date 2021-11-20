import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { EditRoleDto } from './dto/edit-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    console.log(createRoleDto);
    if (!createRoleDto.value || !createRoleDto.description) {
      throw new Error('Переданы неправильные параметры');
    }
    const createdRole = new this.roleModel(createRoleDto);
    return createdRole.save();
  }

  async deleteRole(id): Promise<Role> {
    return this.roleModel.findByIdAndDelete(id);
  }
  async editRole(editRoleDto: EditRoleDto): Promise<Role> {
    return this.roleModel.findByIdAndUpdate(editRoleDto.id, {
      value: editRoleDto.value,
      description: editRoleDto.description,
    });
  }

  async getRole(id): Promise<Role> {
    return this.roleModel.findById(id);
  }

  async getRoleByValue(value: string): Promise<Role> {
    return this.roleModel.findOne({ value: value });
  }

  async getRoles(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }
}
