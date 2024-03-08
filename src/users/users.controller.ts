import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/custom-serializer.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private userService: UsersService,
        private aurthService: AuthService
    ){}

    @Get('/me')
    @UseGuards(AuthGuard)
    me(@CurrentUser() user: User){
        return user;
    }

    @Post('/signup')
    async createUser(@Body() body: createUserDto, @Session() session: any) {
        const user = await this.aurthService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: createUserDto, @Session() session: any) {
        const user = await this.aurthService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    } 

    @Post('/signout')
    signOut(@Session() session: any){
        session.userId = null;
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
