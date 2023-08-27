import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { StorageService } from './storage.service';
import { WriteStream, createReadStream, createWriteStream, write } from 'fs';
import { Response } from 'express';

@Controller('storage')
export class StorageController {
    constructor(private storageService: StorageService) {}

    @Get('/public/:id')
    async getFile(@Param('id') objectId: string, @Res() res: Response) {
        try {
            const fileStream = await this.storageService.getFile(objectId);
            res.setHeader('Content-Type', 'image/jpeg');
            res.write(fileStream, 'binary');
            res.end();
        } catch(e) {
            res.status(404).send('File not found');
        }
    }
}
