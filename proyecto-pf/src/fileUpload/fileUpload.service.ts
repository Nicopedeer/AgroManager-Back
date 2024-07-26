import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {FileUploadRepository } from "./fileUpload.repository";
import { Supplies } from "src/entities/supplies.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FileUploadService{
    constructor( 
        @InjectRepository(Supplies)
        private suppliesRepository: Repository<Supplies>,
        private readonly fileUploadRepositoy: FileUploadRepository){}

    async uploadImage (file: Express.Multer.File, suppliesId: string) {
        const supply = await this.suppliesRepository.findOneBy({id: suppliesId})
        if (!supply) { throw new NotFoundException("Suministro no encontrado")}
        
        const response = await this.fileUploadRepositoy.uploadImage(file)

        await this.suppliesRepository.update(suppliesId, {
            imgUrl: response.secure_url
        })

        const updateSupply = await this.suppliesRepository.findOneBy({id: suppliesId})

        return updateSupply

    }
}