import { BadRequestException, Injectable } from '@nestjs/common';
import * as measurements from '../utils/measurements.json'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Measurements } from 'src/entities/measurements.entity';
import { CreateMeasurementDto } from './dto/createMeasurement.dto';

@Injectable()
export class MeasurementsRepository {
    constructor(
        @InjectRepository(Measurements)
        private readonly measurementsRepository: Repository<Measurements>
    ) {}

    async getMeasurements() {
        return await this.measurementsRepository.find();
    }

    async addMeasurements(){
        for (const element of measurements) {
            const measurementFound = await this.measurementsRepository.findOne({where:{name: element.name}})
            if(!measurementFound){
            await this.measurementsRepository
                .createQueryBuilder()
                .insert()
                .into(Measurements)
                .values({ name: element.name })
                .orIgnore()
                .execute();
        }
    }

        return 'Unidades de medida cargadas'
    }

    async createMeasurements(measurement : CreateMeasurementDto){
        const {name} = measurement
        const exist = await this.measurementsRepository.findOne({where:{
            name : name
        }})
        if(exist){
            throw new BadRequestException(`Ya existe la categoria con el nombre: ${name}`)
        }
        const newMeasurement = new Measurements()
        newMeasurement.name = name
        return await this.measurementsRepository.save(newMeasurement)
    }
    }