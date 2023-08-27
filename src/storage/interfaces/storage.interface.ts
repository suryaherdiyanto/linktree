export interface CanUploadData {
    put(data: Buffer): string;
    get(objectId: string): any;
    delete(objectId: string): any;
}