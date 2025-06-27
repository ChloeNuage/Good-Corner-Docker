/* DROP TABLE IF EXISTS TAG_AD;
DROP TABLE IF EXISTS AD;
DROP TABLE IF EXISTS CATEGORY;
DROP TABLE IF EXISTS TAG;

PRAGMA foreign_keys = ON;

CREATE TABLE TAG(
    ID INTEGER PRIMARY KEY,
    TITLE TEXT NOT NULL
);

CREATE TABLE CATEGORY(
    ID INTEGER PRIMARY KEY,
    TITLE TEXT NOT NULL);

CREATE TABLE ad (
    ID INTEGER PRIMARY KEY,
    TITLE TEXT,
    DESCRIPTION TEXT,
    OWNER TEXT,
    PRICE INTEGER,
    CREATEDAT DATE,
    PICTURE TEXT,
    LOCATION TEXT,
    CATEGORYID INTEGER NOT NULL,
    FOREIGN KEY(CATEGORYID) REFERENCES CATEGORY(ID));

CREATE TABLE TAG_AD (
    ID INTEGER PRIMARY KEY,
    TAGID INTEGER NOT NULL,
    ADID INTEGER NOT NULL,
    FOREIGN KEY(TAGID) REFERENCES TAG(ID),
    FOREIGN KEY(ADID) REFERENCES ad(ID)
);

INSERT INTO CATEGORY (TITLE) VALUES ('AUTRE');
INSERT INTO TAG (TITLE) VALUES ('NEUF'), ('SOLDE');


INSERT INTO ad ( TITLE, DESCRIPTION,OWNER,PRICE,CREATEDAT,PICTURE,LOCATION, CATEGORYID) VALUES
    ('Vélo à vendre', 'Vélo en bon état, peu servi', 'john.doe@gmail.com', 150, '2024-03-19', NULL, 'Paris', 1);

INSERT INTO TAG_AD (TAGID, ADID) VALUES(1,1);
INSERT INTO TAG_AD (TAGID, ADID) VALUES(2,1);


SELECT * FROM AD JOIN CATEGORY ON AD.ID = CATEGORY.ID; */

-- Supprimer les tables dans l'ordre inverse des dépendances
DROP TABLE IF EXISTS ad_tag CASCADE;
DROP TABLE IF EXISTS ad CASCADE;
DROP TABLE IF EXISTS tag CASCADE;
DROP TABLE IF EXISTS category CASCADE;


-- Recréer les tables
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL
);


INSERT INTO category (title) VALUES 
  ('JEUX'), 
  ('VÉHICULES'), 
  ('MULTIMÉDIA'), 
  ('AMEUBLEMENT'),
  ('VÉLOS'),
  ('HABILLEMENT'),
  ('ÉLECTROMÉNAGER'),
  ('DÉCORATION'),
  ('BÉBÉ'),
  ('JARDINAGE'),
  ('CULTURE');

-- Idem pour tag
CREATE TABLE tag (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL
);

INSERT INTO tag (title) VALUES 
  ('Bon plan'), 
  ('Coup de coeur'), 
  ('Neuf'), 
  ('Occasion');

CREATE TABLE ad (
  id SERIAL PRIMARY KEY,
  title TEXT,
  description TEXT,
  owner TEXT,
  price DECIMAL,
  picture TEXT,
  location TEXT,
  "createdAt" TIMESTAMP,
  "categoryId" INTEGER REFERENCES category(id)
);

INSERT INTO ad (title, description, owner, price, picture, location, "createdAt", "categoryId") VALUES
    ('Vélo de route carbone', 'Vélo en excellent état, très léger, idéal pour les longues sorties.', 'JeanDupont', 1200, '/images/velo.jpg', 'Lyon', '2025-03-23 10:00:00', 5),
    ('Table basse en bois massif', 'Table en chêne massif, quelques traces d''usure.', 'MarieCurie', 150, '/images/table.jpg', 'Bordeaux', '2025-03-22 15:30:00', 4),
    ('PC portable gaming', 'RTX 3070, i7, 16Go RAM, excellent pour les jeux récents.', 'Gamer34', 900, '/images/pcgamer.jpg', 'Paris', '2025-03-20 08:15:00', 3),
    ('Canapé 3 places', 'Grand canapé confortable, tissu gris, parfait état.', 'SophieM', 500, '/images/canap.jpg', 'Marseille', '2025-03-21 17:45:00', 4),
    ('iPhone 13 Pro', 'Modèle 256Go, état impeccable, vendu avec boîte.', 'TechFan', 850, '/images/iphone.jpg', 'Nice', '2025-03-19 12:00:00', 3),
    ('Guitare acoustique Fender', 'Sonorité magnifique, cordes neuves.', 'Musicaddict', 300, '/images/guitare.jpg', 'Lille', '2025-03-18 14:10:00', 11),
    ('Lot de livres de science-fiction', 'Collection de 10 livres, Asimov, Clarke, Herbert.', 'BookLover', 50, '/images/livres.jpg', 'Toulouse', '2025-03-23 09:30:00', 11),
    ('Trottinette électrique', 'Autonomie 30km, vitesse max 25km/h.', 'Ecomobility', 400, '/images/trott.jpg', 'Strasbourg', '2025-03-22 18:20:00', 5),
    ('Montre connectée Garmin', 'Idéale pour le sport, GPS intégré.', 'Sportif75', 200, '/images/montre.jpg', 'Rennes', '2025-03-21 07:45:00', 3),
    ('Lit en bois avec matelas', 'Lit double 140x200 avec matelas mémoire de forme.', 'EmmaD', 600, '/images/lit.jpg', 'Nantes', '2025-03-20 16:30:00', 4),
    ('Sac de randonnée 50L', 'Parfait pour trek, nombreuses poches.', 'Randopassion', 80, '/images/sacrando.jpg', 'Grenoble', '2025-03-19 13:55:00', 6),
    ('Appareil photo reflex Canon', 'Canon EOS 90D avec objectif 18-135mm.', 'PhotoPro', 1100, '/images/camera.jpg', 'Montpellier', '2025-03-18 10:40:00', 3),
    ('Chaussures de trail Salomon', 'Pointure 42, très bon état.', 'TrailRunner', 70, '/images/salomon.jpg', 'Dijon', '2025-03-23 11:00:00', 6),
    ('Enceinte Bluetooth JBL', 'Puissante et étanche, parfait pour l''extérieur.', 'MusicFan', 120, '/images/enceinte.jpg', 'Metz', '2025-03-22 14:25:00', 3),
    ('Voiture d''occasion Renault Clio', 'Clio 4, 2018, 75000km, très bon état.', 'AutoLover', 8900, '/images/clio.jpg', 'Rouen', '2025-03-21 16:15:00', 2),
    ('Bureau en verre', 'Design moderne, parfait pour le télétravail.', 'HomeOffice', 250, '/images/bureau.jpg', 'Brest', '2025-03-20 08:05:00', 4),
    ('Lave-linge Bosch', 'Capacité 7kg, classe A++.', 'EcoWash', 300, '/images/lavelinge.jpg', 'Orléans', '2025-03-19 20:45:00', 7),
    ('Lot de jeux PS5', '5 jeux récents en excellent état.', 'GamerX', 150, '/images/ps5.jpg', 'Le Havre', '2025-03-18 09:20:00', 1),
    ('Poussette bébé', 'Poussette 3 roues tout terrain.', 'BabyCare', 180, '/images/poussette.jpg', 'Perpignan', '2025-03-17 17:50:00', 9),
    ('Piano numérique Yamaha', 'Idéal pour débutants et confirmés.', 'PianisteAmateur', 450, '/images/piano.jpg', 'Avignon', '2025-03-16 12:30:00', 11),
    ('Tondeuse thermique', 'Puissante et efficace, idéale pour grand jardin.', 'Jardinier', 220, '/images/tondeuse.jpg', 'Limoges', '2025-03-15 08:10:00', 10),
    ('Climatiseur mobile', 'Puissance 12000 BTU, parfait pour l''été.', 'CoolLife', 350, '/images/clime.jpg', 'Besançon', '2025-03-14 18:00:00', 7),
    ('Lampe de chevet design', 'Éclairage LED avec variateur.', 'Decoraddict', 40, '/images/lampe.jpg', 'Valence', '2025-03-13 22:45:00', 8),
    ('Plante Verte', 'Jolie plante pour intérieur.', 'PlantLover', 30, '/images/plante-verte.jpg', 'Clermont-Ferrand', '2025-03-12 15:20:00', 8),
    ('Chaise de bureau ergonomique', 'Idéale pour le télétravail.', 'ConfortOffice', 180, '/images/siegebureau.jpg', 'Toulon', '2025-03-11 09:00:00', 4);

CREATE TABLE ad_tag (
    id SERIAL PRIMARY KEY,
    "adId" INTEGER REFERENCES ad(id),
    "tagId" INTEGER REFERENCES tag(id),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ici aussi, pas besoin d’ID manuel
INSERT INTO ad_tag ("adId", "tagId") VALUES
    (1, 4), (2, 4), (3, 3), (3, 4), (4, 4),
    (5, 3), (6, 4), (7, 4), (8, 3),
    (9, 3), (9, 2), (10, 4), (11, 1), (11, 4),
    (12, 3), (12, 2), (13, 4), (14, 3), (14, 1),
    (15, 4), (16, 4), (17, 4), (18, 4), (19, 4),
    (20, 3), (20, 2), (21, 4), (22, 3), (22, 1),
    (23, 3), (23, 2), (24, 3), (25, 3), (25, 1);