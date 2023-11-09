import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
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

  @Column()
  id_image: number;

  @ManyToOne(() => Image, (image) => image.tableaux, {eager: true})
  @JoinColumn({ name: 'id_image' })
  image: Image;

  @OneToMany(() => Avis, (avis) => avis.tableau, { onDelete : 'CASCADE'})
  avis: Avis[];

  @ManyToMany(() => Utilisateur, (utilisateur) => utilisateur.tableauxFavoris)
  @JoinTable({name: 'favoris', 
joinColumn: { name: 'id_tableau', 
referencedColumnName: 'id', },
inverseJoinColumn: { name: 'id_utilisateur',
referencedColumnName: 'id'}})
utilisateur: Utilisateur[];
}

