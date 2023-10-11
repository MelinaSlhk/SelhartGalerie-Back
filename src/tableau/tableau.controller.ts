import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TableauService } from './tableau.service';
import { CreateTableauDto } from './dto/create-tableau.dto';
import { UpdateTableauDto } from './dto/update-tableau.dto';

@Controller('tableau')
export class TableauController {
  constructor(private readonly tableauService: TableauService) {}

  @Post()
  create(@Body() createTableauDto: CreateTableauDto) {
    return this.tableauService.create(createTableauDto);
  }

  @Get()
  findAll() {
    return this.tableauService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableauService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableauDto: UpdateTableauDto) {
    return this.tableauService.update(+id, updateTableauDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableauService.remove(+id);
  }
}
