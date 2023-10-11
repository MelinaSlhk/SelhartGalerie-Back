import { Test, TestingModule } from '@nestjs/testing';
import { TableauService } from './tableau.service';

describe('TableauService', () => {
  let service: TableauService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableauService],
    }).compile();

    service = module.get<TableauService>(TableauService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
