import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';
import { GetUtilisateur } from 'src/auth/get-user.decorator';

@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Post()
  create(@Body() createUtilisateurDto: CreateUtilisateurDto) {
    return this.utilisateurService.create(createUtilisateurDto);
  }

  @Get()
  findAll() {
    return this.utilisateurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utilisateurService.findOne(+id);
  }

  // voir si j ai le temps de faire la mise à jour d un user

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateUtilisateurDto: UpdateUtilisateurDto,
    @GetUtilisateur() utilisateur: Utilisateur,
  ) {
    return this.utilisateurService.update(+id, updateUtilisateurDto);
  }


  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.utilisateurService.remove(+id);
  }
}
