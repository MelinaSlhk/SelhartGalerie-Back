import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  // username?: string;
  // email?: string;
  currentmotdepasse?: string;
  newmotdepasse?: string;
}
