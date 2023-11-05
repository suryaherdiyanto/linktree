import { BadRequestException, Body, Controller, HttpCode, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import {CreateUserDTO} from './dtos/create-user.dto';
import {CreateUserInterceptor} from './interceptors/create-user.interceptor';
import {UsersService} from './users.service';
import { LoginUserDTO } from './dtos/login-user.dto';
import * as Jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { JWTGuard } from './guards/jwt.guard';
import { User as JWTUser } from './decorators/jwt-user.decorator';
import { User } from 'src/entities/users.entity';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
	constructor(private userService: UsersService, private configService: ConfigService) {}

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

	@Post('/login')
	@HttpCode(200)
	async login(@Body() data: LoginUserDTO)
	{
		const userAttempt = await this.userService.findByEmail(data.email);
		let isPasswordValid = false;

		if (userAttempt) {
			isPasswordValid = await bcrypt.compare(data.password, userAttempt.password);
		}

		if (!userAttempt || !isPasswordValid) {
			throw new BadRequestException("Unknown username or password!");
		}

		const { id, username, name, email } = userAttempt;
		const token = Jwt.sign({id, username, name, email}, this.configService.get<string>('JWT_SECRET', 'verysecretkey'), { expiresIn: '1h' });

		return { message: 'Login Successfully', token };
	}

	@Post('/logout')
	@UseGuards(JWTGuard)
	@HttpCode(200)
	async logout(@JWTUser() user: Partial<User>)
	{
		await this.userService.updateToken(user.id, null);
		return { message: 'Token removed successfully' };
	}
}
