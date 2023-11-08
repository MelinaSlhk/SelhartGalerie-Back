import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity'; 
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { PassportModule } from '@nestjs/passport';
import { Tableau } from 'src/tableau/entities/tableau.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Utilisateur]),
    TypeOrmModule.forFeature([Tableau]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
})
export class UtilisateurModule {}
