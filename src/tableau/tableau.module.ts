import { Module } from '@nestjs/common';
import { TableauService } from './tableau.service';
import { TableauController } from './tableau.controller';

@Module({
  controllers: [TableauController],
  providers: [TableauService],
})
export class TableauModule {}
