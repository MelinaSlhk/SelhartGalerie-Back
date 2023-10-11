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
  async register(createAuthDto: CreateAuthDto) {
    const { nom, prenom, email, mot_de_passe, admin } = createAuthDto;
    const salt = await bcrypt.genSalt();
    console.log(salt);
    const hashedMotDePasse = await bcrypt.hash(mot_de_passe, salt);
    // console.log(hashedMotDePasse);

    const utilisateur = this.utilisateursRepository.create({
      nom,
      prenom,
      email,
      mot_de_passe: hashedMotDePasse,
      // admin: false,
    });

    // Enregistrez l'utilisateur dans la base de données
    return await this.utilisateursRepository.save(utilisateur);
  }

  async login(loginDto: LoginDto) {
    const { email, mot_de_passe } = loginDto;
    const utilisateur = await this.utilisateursRepository.findOneBy({ email });

    if (
      utilisateur &&
      (await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe))
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


