import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {FileUploadRepository } from "./fileUpload.repository";
//import { InjectRepository } from "@nestjs/typeorm";
//import { Repository } from "typeorm";

@Injectable()
export class FileUploadService{
    constructor( 
        private readonly fileUploadRepositoy: FileUploadRepository){}

    async uploadImage (file: Express.Multer.File,) {
        
        const response = await this.fileUploadRepositoy.uploadImage(file)


    }
}