import { Module } from '@nestjs/common';
import { TableauService } from './tableau.service';
import { TableauController } from './tableau.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Tableau } from './entities/tableau.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tableau])],
  controllers: [TableauController],
  providers: [TableauService],
})
export class TableauModule {}
