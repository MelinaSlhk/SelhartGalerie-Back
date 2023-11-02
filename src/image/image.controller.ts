import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, StreamableFile, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('monFichier'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.imageService.create(file);
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  getImageById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    return this.imageService.getImage(+id, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
