import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateHL7MessageDto } from './dto/create-hl7message.dto';
import { HL7Message } from './entities/hl7.entity';

@Injectable()
export class HL7Service implements OnModuleInit {
  constructor(
    @Inject('HL7_REPOSITORY')
    private hl7MessageRepository: Repository<HL7Message>,
    @Inject('HL7_SERVER')
    private hl7Server: any,
  ) {}

  onModuleInit() {
    this.hl7Server.on('hl7', (data: string) => {
      this.create({ payload: data });
    });
  }

  async create(createHL7MessageDto: CreateHL7MessageDto): Promise<HL7Message> {
    const hl7Message = new HL7Message();
    hl7Message.payload = createHL7MessageDto.payload;
    return this.hl7MessageRepository.save(hl7Message);
  }

  async findAll(): Promise<HL7Message[]> {
    return this.hl7MessageRepository.find();
  }

  async findOne(id: number): Promise<HL7Message> {
    return this.hl7MessageRepository.findOneBy({ id: id });
  }

  async findOneBy(
    where: FindOptionsWhere<HL7Message> | FindOptionsWhere<HL7Message>[],
  ): Promise<HL7Message> {
    return this.hl7MessageRepository.findOneBy(where);
  }

  async remove(id: number): Promise<void> {
    await this.hl7MessageRepository.delete(id);
  }
}
