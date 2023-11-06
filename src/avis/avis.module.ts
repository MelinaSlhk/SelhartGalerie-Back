import { Module } from '@nestjs/common';
import { AvisService } from './avis.service';
import { AvisController } from './avis.controller';
import { Avis } from './entities/avi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tableau } from 'src/tableau/entities/tableau.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Avis, Tableau])],
  controllers: [AvisController],
  providers: [AvisService],
})
export class AvisModule {}
