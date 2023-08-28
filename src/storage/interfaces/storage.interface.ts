export interface CanStoreResource {
    put(data: Buffer, uploadId: string): Promise<string>;
    get(objectId: string): Promise<Buffer|string>;
    delete(objectId: string): any;
}