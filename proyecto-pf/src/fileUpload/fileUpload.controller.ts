import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileUploadService } from "./fileUpload.service";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { fileUploadDecorator } from "./fileUpload.decorator";


@ApiTags("files")
@Controller("files")
export class FileUploadController {
constructor(private readonly fileUploadService: FileUploadService){}

    @ApiConsumes('multipart/form-data')
    @ApiBody({
    schema: {
        type: 'object',
        properties: {
            file: {
                type: 'string',
                format: 'binary',
            },
        },
    },
    })
    @Post("/uploadimage/:id")
    @UseInterceptors(FileInterceptor("file"))
    @fileUploadDecorator()
    uploadImage(@Param("id") suppliesId: string,
    @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({
                    maxSize: 2097152,
                    message: "Exceeds the allowed range, 2MB."
                }),
                new FileTypeValidator({
                    fileType: /(jpg|jpeg|png|webp|gif|svg)/,
                })
            ]
        })
    ) file: Express.Multer.File,
){
    return this.fileUploadService.uploadImage(file, suppliesId)
    }
}