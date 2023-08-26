import { Controller, Put, UseGuards } from '@nestjs/common';
import { JWTGuard } from '../users/guards/jwt.guard';
import { ProfilesService } from './profiles.service';
import { User as UserJWT } from 'src/users/decorators/jwt-user.decorator';
import { User } from 'src/users/users.entity';

@Controller('profiles')
export class ProfilesController {

    constructor(private profileService: ProfilesService) {}

    @Put('/update')
    @UseGuards(JWTGuard)
    updateProfile(@UserJWT() user: Partial<User>) {
        return user;
    }
}
