import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

export const GetUtilisateur = createParamDecorator(
  (_data, ctx: ExecutionContext): Utilisateur => {
    const req = ctx.switchToHttp().getRequest();
    return req.utilisateur; // NE PAS RENOMMER
    // c'est toujours la propriété user de req que l'on retourne
  },
);
