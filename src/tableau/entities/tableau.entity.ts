import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Image } from 'src/image/entities/image.entity'; 
import { Avis } from 'src/avis/entities/avi.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

@Entity('tableau')
export class Tableau {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nom: string;

  @Column({ length: 255 })
  dimension: string;

  @ManyToOne(() => Image, (image) => image.tableaux)
  image: Image; // Relation avec l'entité Image

  @OneToMany(() => Avis, (avis) => avis.tableau)
  avis: Avis[];

  @ManyToMany(() => Utilisateur, (utilisateur) => utilisateur.favoris)
  utilisateurs: Utilisateur[];
  
}
