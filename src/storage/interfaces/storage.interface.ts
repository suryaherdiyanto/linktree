export interface CanStoreResource {
    put(data: Buffer, uploadId: string): Promise<string>;
    get(objectId: string): any;
    delete(objectId: string): any;
}