import { Module } from "@nestjs/common";
import { CloudinaryConfig } from "../configs/cloudinary";
import { FileUploadRepository } from "./fileUpload.repository";
import { FileUploadController } from "./fileUpload.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileUploadService } from "./fileUpload.service";
import { Supplies } from "src/entities/supplies.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Supplies])],
    controllers: [FileUploadController],
    providers: [CloudinaryConfig, FileUploadRepository, FileUploadService],
})
export class FileUploadModule{}