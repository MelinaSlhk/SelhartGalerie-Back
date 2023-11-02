import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private imagesRepository: Repository<Image>,
  ) {}

  async getImage(id: number, res): Promise<StreamableFile> {
    const result = await this.imagesRepository.findOneBy({id});    
    const imageFile = createReadStream(
      join(process.cwd(), 'uploads', result.nom),
    );
    console.log(process.cwd());

    res.set('Content-Type', result.typemime);

    return new StreamableFile(imageFile);
  }
  create(image: Express.Multer.File) {
    console.log(image);

    return this.imagesRepository.save({
      nom: image.filename,
      description: image.originalname,
      typemime: image.mimetype,
    });
  }

  findAll() {
    return `This action returns all image`;
  }

  async findOne(id: number) {
    const found = await this.imagesRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`images avec l'id ${id} introuvable`);
    }
    return found;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
