import { Test, TestingModule } from '@nestjs/testing';
import { TableauController } from './tableau.controller';
import { TableauService } from './tableau.service';

describe('TableauController', () => {
  let controller: TableauController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableauController],
      providers: [TableauService],
    }).compile();

    controller = module.get<TableauController>(TableauController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
