import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Utilisateur } from './entities/utilisateur.entity';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
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

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUtilisateurDto: UpdateUtilisateurDto, @GetUtilisateur() utilisateur: Utilisateur) {
    return this.utilisateurService.update(+id, updateUtilisateurDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilisateurService.remove(+id);
  }
}
  
  // @Post('/tableau/favoris/:id')
  // async addFavori(
  //   @Param('id') utilisateurId: number,
  //   @Body() { tableauId }: { tableauId: number },
  // ) {
  //   await this.utilisateurService.update(utilisateurId, tableauId);
  // }
// }

