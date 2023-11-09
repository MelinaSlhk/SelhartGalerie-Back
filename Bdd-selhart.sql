CREATE DATABASE selhartgalerie;

CREATE TABLE utilisateur (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  motDePasse CHAR(60) NOT NULL,
  administrateur BOOLEAN NOT NULL
);

CREATE TABLE image (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  typemime VARCHAR(255) NOT NULL
);

CREATE TABLE tableau (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  dimension VARCHAR(255) NOT NULL,
  id_image INTEGER NOT NULL,
  CONSTRAINT fk_image FOREIGN KEY (id_image) REFERENCES image(id)
);

CREATE TABLE avis (
  id SERIAL PRIMARY KEY,
  avis TEXT NULL,
  id_utilisateur INTEGER,
  id_tableau INTEGER,
  CONSTRAINT fk_utilisateur_avis FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id) ON DELETE CASCADE,
  CONSTRAINT fk_tableau_avis FOREIGN KEY (id_tableau) REFERENCES tableau(id) ON DELETE CASCADE,
  UNIQUE (id_utilisateur, id_tableau)
);

CREATE TABLE favoris (
  id_utilisateur INTEGER,
  id_tableau INTEGER,
  PRIMARY KEY (id_utilisateur , id_tableau),
  FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id) ON DELETE CASCADE,
  FOREIGN KEY (id_tableau) REFERENCES tableau(id)
);

INSERT INTO image (nom, description, type_mime)VALUES
('Le commencement', 'représentation abstraite d''un soleil et d''une plante','JPG'),
('La vie en folie', 'un coeur une fleur un palmier dans un environnement abstrait', 'JPEG'),
('L''arbre féérique', 'un arbre sans feuille dans un environnement abstrait', 'JPEG'),
('L''Australie en larme', 'un arbre en feu avec un koala en larme', 'JPEG'),
('Moonwalk avec les étoiles', 'Michael Jackson sur la pointe des pied au milieu de la galaxy', 'JPEG'),
('MickeyOuf', 'La tête de Mickey qui fait deux doigts d''honneur', 'JPEG'),
('La plume au coeur', 'un coeur en plume sur fond corail fluo', 'JPEG'),
('Le palmier explosif', '', ''),
('La traversée du coucher', '', ''),
('La fée scintillante', '', ''),
('L''ombre de soi', '', ''),
('Brindille', '', ''),
('Gribouille', '', ''),
('Derrière la fée', '', ''),
('Le duo 3D', '', ''),
('Le levé du cosmos', '', ''),
('Le sapin enchanté', '', '');

INSERT INTO tableau (nom, dimension) VALUES
('Le commencement', '46cm x 54,5cm'),
('La vie en folie', '70cm x 50cm'),
("L\'arbre féérique", '54cm x 65cm'),
("L\'Australie en larme", '54cm x 65cm'),
('Moonwalk avec les étoiles', '70cm x 50cm'),
('MickeyOuf', '24cm x 30cm'),
('La plume au coeur', '25cm x 30cm'),
('Le palmier explosif', '30cm x 40cm'),
('La traversée du coucher', '30cm x 40cm'),
('La fée scintillante', '24cm x 30cm'),
("L\'ombre de soi", '120cm x 40cm'),
('Brindille', '24cm x 30cm'),
('Gribouille', '24cm x 30cm'),
('Derrière la fée', '24cm x 30cm'),
('Le duo 3D', '30cm x 30cm'),
('Le levé du cosmos', '24cm x 30cm'),
('Le sapin enchanté', '24cm x 30cm');

