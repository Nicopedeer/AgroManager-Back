import { Controller, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileUploadService } from "./fileUpload.service";
import { ApiTags } from "@nestjs/swagger";


@ApiTags("files")
@Controller("files")
export class FileUploadController {
constructor(private readonly fileUploadService: FileUploadService){}

    @Post()
    @UseInterceptors(FileInterceptor("file"))
    uploadImage(
    @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({
                    maxSize: 400000,
                    message: "Excede el rango permitido, 400kb."
                })
            ]
        })
    ) file: Express.Multer.File,
){
    return this.fileUploadService.uploadImage(file)
    }
}