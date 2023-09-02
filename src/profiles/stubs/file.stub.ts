import { createReadStream } from "fs"

export const validFile: Express.Multer.File = {
    filename: 'me.jpg',
    mimetype: 'image/jpg',
    size: 600000,
    fieldname: 'file',
    encoding: 'UTF-8',
    stream: createReadStream('test'),
    destination: './test',
    path: './src',
    buffer: Buffer.from('test'),
    originalname: 'me.jpg',
}
export const largeFile: Express.Multer.File = {
    filename: 'me.jpg',
    mimetype: 'image/jpg',
    size: 2000000,
    fieldname: 'file',
    encoding: 'UTF-8',
    stream: createReadStream('test'),
    destination: './test',
    path: './src',
    buffer: Buffer.from('test'),
    originalname: 'me.jpg',
}
export const textFile: Express.Multer.File = {
    filename: 'me.txt',
    mimetype: 'text/plain',
    size: 5000,
    fieldname: 'file',
    encoding: 'UTF-8',
    stream: createReadStream('test'),
    destination: './test',
    path: './src',
    buffer: Buffer.from('test'),
    originalname: 'me.jpg',
}