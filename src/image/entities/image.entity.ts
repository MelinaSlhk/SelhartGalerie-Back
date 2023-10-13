import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tableau } from 'src/tableau/entities/tableau.entity';

@Entity('image')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nom: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  typemime: string;

  @OneToMany(() => Tableau, (tableau) => tableau.image)
  tableaux: Tableau[]; // Relation avec l'entité Tableau
}
