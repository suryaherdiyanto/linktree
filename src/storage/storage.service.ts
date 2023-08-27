import { Injectable } from "@nestjs/common";
import { S3Storage } from "./s3.storage";
import { CanStoreResource } from "./interfaces/storage.interface";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class StorageService {
    private storage: CanStoreResource;

    constructor(private configService: ConfigService) {
        this.storage = new S3Storage({
                region: this.configService.get<string>('AWS_REGION', 'asia'),
                bucket: this.configService.get<string>('AWS_BUCKET', 'examplebucket'),
                accessKey: this.configService.get<string>('AWS_ACCESSKEY', ''),
                secretKey: this.configService.get<string>('AWS_SECRETKEY', '')
            }
        );

    }

    uploadFile(data: Buffer, filename: string) {
        return this.storage.put(data, filename);
    }
}