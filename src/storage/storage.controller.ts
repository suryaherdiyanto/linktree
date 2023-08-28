import { Controller, Get, Param, Res } from '@nestjs/common';
import { StorageService } from './storage.service';
import { Response } from 'express';

@Controller('storage')
export class StorageController {
    constructor(private storageService: StorageService) {}

    @Get('/public/:id')
    async getFile(@Param('id') objectId: string, @Res() res: Response) {
        try {
            const fileStream = await this.storageService.getFile(objectId);

            res.setHeader('Content-Type', 'image/jpeg');
            fileStream.pipe(res);
        } catch(e) {
            console.log(e);

            res.status(404).send('File not found');
        }
    }
}
