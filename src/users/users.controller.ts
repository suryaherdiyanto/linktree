import { BadRequestException, Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import {CreateUserDTO} from './dtos/create-user.dto';
import {CreateUserInterceptor} from './interceptors/create-user.interceptor';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) {}

	@Post('/register')
	@UseInterceptors(CreateUserInterceptor)
	async register(@Body() data: CreateUserDTO) {
		const isEmailExists = await this.userService.findByEmail(data.email);

		if (isEmailExists) {
			throw new BadRequestException(`Email: ${data.email} already been used!`);
		}

		const isUsernameExists = await this.userService.findByUsername(data.username);

		if (isUsernameExists) {
			throw new BadRequestException(`Username: ${data.username} already been used!`);
		}

		if (data.password !== data.password_confirmation) {
			throw new BadRequestException('Password must be valid!');
		}

		const user = await this.userService.create(data)

		return { message: "Successfully registered!", data: user }
	}
}
