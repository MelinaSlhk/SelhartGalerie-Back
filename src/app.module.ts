import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { AuthModule } from './auth/auth.module';
import { Utilisateur } from './utilisateur/entities/utilisateur.entity';
import { ImageModule } from './image/image.module';
import { TableauModule } from './tableau/tableau.module';
import { AvisModule } from './avis/avis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env`] }),
    // ConfigModule pour la gestion du fichier environnement
    UtilisateurModule,
    TypeOrmModule.forRoot({
      // TypeOrm et sa config pour se connecter à la BDD
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Utilisateur],
      synchronize: false,
      // "synchronize" doit rester sur false. Lorsqu'il est activé (true), TypeORM essaiera d'ajuster automatiquement les tables
      // dans la base de données en fonction de vos entités. Cela pourrait entraîner des changements non désirés.
      // Nous voulons avoir un contrôle total sur la structure de notre base de données.
      dropSchema: false,
      // Important de laisser "dropSchema" sur false. Si mis à true,
      // cela supprimera et recréera les tables lors de l'initialisation,
      // effaçant toutes les données.
      logging: true,
      // Permet d'afficher les requetes SQL de TypeOrm dans la console
    }),
    UtilisateurModule,
    AuthModule,
    ImageModule,
    TableauModule,
    AvisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
