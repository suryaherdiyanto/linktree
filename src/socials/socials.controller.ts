import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SocialsService } from './socials.service';
import { CreateSocialDTO } from './dtos/create-social.dto';
import { JWTGuard } from '../users/guards/jwt.guard';
import { User } from '../entities/users.entity';
import { User as UserJWT } from '../users/decorators/jwt-user.decorator';
import { socials } from '../entities/socials.entity';

@Controller('socials')
export class SocialsController {
    constructor(private socialService: SocialsService) {}

    @Post('/create')
    @UseGuards(JWTGuard)
    createSocial(@Body() data: CreateSocialDTO, @UserJWT() user: Partial<User>)
    {
        return this.socialService.saveSocial(user.id, data.title, socials[data.social_media], data.url);
    }
}
