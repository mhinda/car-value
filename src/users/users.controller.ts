import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/custom.serializer.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private userService: UsersService,
        private aurthService: AuthService
    ){}

    @Post('/signup')
    createUser(@Body() body: createUserDto) {
        return this.aurthService.signup(body.email, body.password);
    }

    @Post('/signin')
    signin(@Body() body: createUserDto) {
        return this.aurthService.signin(body.email, body.password);
    } 

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findOneBy(parseInt(id))
    }

    @Get()
    findUsersByEmail(@Query('email') email: string) {
        return this.userService.findBy(email)
    }

    @Get()
    findAllUsers() {
        return this.userService.findAll()
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id))
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body)
    }

}
