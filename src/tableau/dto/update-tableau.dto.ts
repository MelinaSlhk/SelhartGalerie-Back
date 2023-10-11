import { PartialType } from '@nestjs/swagger';
import { CreateTableauDto } from './create-tableau.dto';

export class UpdateTableauDto extends PartialType(CreateTableauDto) {}
