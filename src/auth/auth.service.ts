import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   register(createAuthDto: CreateAuthDto) {
//     return 'This action adds a new auth';
//   }
// }
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateursRepository: Repository<Utilisateur>,
    private jwtService: JwtService,
  ) {}
  async inscription(createAuthDto: CreateAuthDto) {
    const { nom, prenom, email, motdepasse, admin } = createAuthDto;
    const salt = await bcrypt.genSalt();
    console.log(salt);
    const hashedmotdepasse = await bcrypt.hash(motdepasse, salt);
    // console.log(hashedmotdepasse);

    const utilisateur = this.utilisateursRepository.create({
      nom,
      prenom,
      email,
      motdepasse: hashedmotdepasse,
      // admin: false,
    });

    // Enregistrez l'utilisateur dans la base de données
    return await this.utilisateursRepository.save(utilisateur);
  }

  async login(loginDto: LoginDto) {
    const { email, motdepasse } = loginDto;
    const utilisateur = await this.utilisateursRepository.findOneBy({ email });

    if (
      utilisateur &&
      (await bcrypt.compare(motdepasse, utilisateur.motdepasse))
    ) {
      const playload = { email };
      const accessToken = await this.jwtService.sign(playload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Ces identifiants ne sont pas corrects.');
    }
  }
  // async comparePasswords(
  //   password: string,
  //   memberPassword: string,
  // ): Promise<boolean> {
  //   return bcrypt.compare(password, memberPassword);
  // }
}
