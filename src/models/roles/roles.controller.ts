import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './schemas/role.schema';
import { RolesService } from './roles.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EditRoleDto } from './dto/edit-role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Получение всех ролей / IN PROGRESS' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get() //TODO: Изменить на POST и сделать определение от какого пользователя произошел запрос
  getRoles() {
    return this.rolesService.getRoles();
  }

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: Role })
  @Post('/create')
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @ApiOperation({ summary: 'Удаление роли' })
  @ApiResponse({ status: 200, type: Role })
  @ApiParam({ name: 'id', type: String, description: 'id нужной роли' })
  @Post('/delete')
  deleteRole(@Body() { id }) {
    return this.rolesService.deleteRole(id);
  }
  @ApiOperation({ summary: 'Изменение роли' })
  @ApiResponse({ status: 200, type: Role })
  @ApiParam({ name: 'id', type: String, description: 'id нужной роли' })
  @Post('/edit')
  editRole(@Body() editRoleDto: EditRoleDto) {
    return this.rolesService.editRole(editRoleDto);
  }
}
