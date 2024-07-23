import { Module } from "@nestjs/common";
import { CloudinaryConfig } from "../configs/cloudinary";
import { FileUploadRepository } from "./fileUpload.repository";
import { FileUploadController } from "./fileUpload.controller";
//import { TypeOrmModule } from "@nestjs/typeorm";
import { FileUploadService } from "./fileUpload.service";

@Module({
    //imports:[TypeOrmModule.forFeature([Product])],
    controllers: [FileUploadController],
    providers: [CloudinaryConfig, FileUploadRepository, FileUploadService],
})
export class FileUploadModule{}