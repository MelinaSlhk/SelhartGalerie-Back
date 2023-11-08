import { Avis } from 'src/avis/entities/avi.entity';
import { Tableau } from 'src/tableau/entities/tableau.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('utilisateur')
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nom: string;

  @Column({ length: 255 })
  prenom: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 60 })
  motdepasse: string;

  @Column({ nullable: false })
  administrateur: boolean;

  @OneToMany(() => Avis, (avis) => avis.utilisateur)
  avis: Avis[];

  @ManyToMany(() => Tableau, (tableau) => tableau.utilisateur, {eager: true, cascade: true})
  @JoinTable({name: 'favoris', 
joinColumn: { name: 'id_utilisateur', 
referencedColumnName: 'id', },
inverseJoinColumn: { name: 'id_tableau',
referencedColumnName: 'id'}})
  tableauxFavoris: Tableau[];
}
