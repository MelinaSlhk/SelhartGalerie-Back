import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
} from '@nestjs/common';
import { AvisService } from './avis.service';
import { CreateAviDto } from './dto/create-avi.dto';
import { UpdateAviDto } from './dto/update-avi.dto';
import { promises } from 'dns';
import { Avis } from './entities/avi.entity';

@Controller('avis')
export class AvisController {
  constructor(private readonly avisService: AvisService) {}

  @Post(':id_tableau')
  create(
    @Request() req,
    @Param('id_tableau') id_tableau: number,
    @Body() createAviDto: CreateAviDto,
  ) {
    const utilisateur = req.user;
    console.log(utilisateur);
    console.log('le creatDto ' + JSON.stringify(createAviDto));
    return this.avisService.create(createAviDto, utilisateur, +id_tableau);
  }

  @Get('tableau/:id')
  async findAllByTableauId(@Param('id') id: number) {
    return await this.avisService.findAllByTableauId(+id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.avisService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAviDto: UpdateAviDto) {
    return this.avisService.update(+id, updateAviDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avisService.remove(+id);
  }
}
