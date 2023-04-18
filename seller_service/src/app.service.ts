import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './interfaces/seller.interface';
import { CreateInvoiceDto } from './dto/CreateInvoice.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel('Invoice') private readonly sellerModel: Model<Invoice>,
  ) {}

  async findAll(): Promise<CreateInvoiceDto[]> {
    return this.sellerModel.find().exec();
  }

  async findOne(id: string): Promise<CreateInvoiceDto> {
    return this.sellerModel.findById(id).exec();
  }

  async create(createInvoiceDto: CreateInvoiceDto): Promise<CreateInvoiceDto> {
    const createdInvoice = new this.sellerModel(createInvoiceDto);
    return createdInvoice.save();
  }

  async update(
    id: string,
    createInvoiceDto: CreateInvoiceDto,
  ): Promise<CreateInvoiceDto> {
    return this.sellerModel
      .findByIdAndUpdate(id, createInvoiceDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<CreateInvoiceDto> {
    return this.sellerModel.findByIdAndRemove(id).exec();
  }
}
