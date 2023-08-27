import * as AWS from "@aws-sdk/client-s3";
import { CanStoreResource } from "./interfaces/storage.interface";

interface S3StorageConfig {
    region: string;
    bucket: string;
    accessKey: string;
    secretKey: string;
}

export class S3Storage implements CanStoreResource {
    private client: AWS.S3Client;
    private region: string;
    private bucket: string;
    private accessKey: string;
    private secretKey: string;

    constructor(data: S3StorageConfig) {
        this.region = data.region;
        this.bucket = data.bucket;
        this.accessKey = data.accessKey;
        this.secretKey = data.secretKey;

        this.client = new AWS.S3Client({ region: this.region, credentials: { accessKeyId: this.accessKey, secretAccessKey: this.secretKey } });
    }

    async put(data: Buffer, uploadId: string): Promise<string> {
        const uploadCommand = new AWS.PutObjectCommand({ Bucket: this.bucket, Key: uploadId, Body: data });
        const upload = await this.client.send(uploadCommand);
        console.log(upload);

        return 'a';
    }

    get(objectId: string) {
        return '';
    }

    delete(objectId: string) {
        return 'a';
    }
}