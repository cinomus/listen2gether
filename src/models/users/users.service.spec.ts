import { UsersService } from './users.service';

describe('User Service', () => {
  let usersService: UsersService;
  let userRepositoryMock: UserRepositoryInterface<string>;

  beforeEach(() => {
    userRepositoryMock = {
      save: jest.fn() as (user: UserInterface<string>) => Promise<void>,
      update: jest.fn() as (user: UserInterface<string>) => Promise<void>,
    } as UserRepositoryInterface<string>;
    userService = new UserService<string>(userRepositoryMock);
  });
  describe('create', () => {
    it('should be return user with correct login and password', async () => {
      const dto: UserDto = { login: 'test', password: 'pass' };
      const user: UserInterface<string> = await userService.create(dto);

      expect(userRepositoryMock.save).toBeCalledTimes(1);
      expect(user.login).toBe(dto.login);
      expect(user.password).toBe(dto.password);
    });
  });
  describe('edit', () => {
    it('should be return updated user with new login and password', async () => {
      userRepositoryMock.getById = jest.fn().mockImplementation(() => ({
        id: 'test',
        login: 'testlogin',
        password: 'testpassword',
      })) as (id: string) => Promise<UserInterface<string>>;

      const dto: UserDto = { password: '123', login: '312' };
      const user: UserInterface<string> = await userService.edit('test', dto);

      expect(userRepositoryMock.getById).toBeCalledTimes(1);
      expect(userRepositoryMock.update).toBeCalledTimes(1);
      expect(user).toBeDefined();
      expect(user.id).toBe('test');
      expect(user.login).toBe(dto.login);
      expect(user.password).toBe(dto.password);
    });
  });
});
