import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
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
    async createSocial(@Body() data: CreateSocialDTO, @UserJWT() user: Partial<User>)
    {
        const social = await this.socialService.saveSocial(user.id, data.title, socials[data.social_media.toUpperCase()], data.url);

        return { message: 'Successfully create social media link', data: social};
    }

    @Delete('/delete/:id')
    async deleteSocial(@Param() id: string)
    {
        await this.socialService.removeSocial(id);

        return { message: 'Successfully delete social media ' };
    }
}
