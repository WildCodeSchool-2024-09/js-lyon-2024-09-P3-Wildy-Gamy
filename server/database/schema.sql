create table game (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null,
  principle varchar(2000) not null,
  in_room boolean DEFAULT false,
  is_playable boolean DEFAULT false,
  image varchar(255) null
);

insert into game (id,name,principle,in_room,is_playable,image)
values
  (1,"PacMan","Mange des boules en evitant des fantomes",true,true,"https://m.media-amazon.com/images/I/71IH4Pvl7rL._AC_UF894,1000_QL80_.jpg"),
  (2,"Mario","Plombier perdu dans un monde sous-terrain qui cherche a sauver son frère Luigi",true,false,"https://prod-printler-front-as.azurewebsites.net/media/photo/166695.jpg?mode=crop&width=638&height=900&rnd=0.0.1"),
  (3, "Tekken","Des personnes de différentes origines se battent jusqu'à la mort.", true, false,"https://i.pinimg.com/736x/c1/3e/11/c13e11a50de147247c595b04f7748696.jpg"),
  (4, "Pinball", "Jouez un vaisseau à travers l'univers.", true, false, "https://i.pinimg.com/736x/90/06/40/900640bc50df22019c5f54c21baf24db.jpg"),
  (5, "Space Invaders", "Défendez-vous contre les aliens qui cherchent à envahir votre planète!", true, false, "https://i.pinimg.com/736x/36/64/e6/3664e640f1dee9dd236237dd4d48ec76.jpg"),
  (6, "Donkey Kong", "Jouez Mario et essayez de sauver votre amie contre Donkey Kong.", true, false, "https://i.pinimg.com/736x/8c/98/f7/8c98f777d9aba20bac28fb702c03c3d2.jpg"),
  (7, "Megaman", "Vous jouer un petit robot qui cherche à sauver sa planète.", true, false, "https://i.pinimg.com/736x/77/8e/e8/778ee8ab0131c732518b6032bce9ac52.jpg"),
  (8, "Castlevania", "Allez dans le manoir de Dracula et empêchez-le de détruire la race humaine.", true, false, "https://i.pinimg.com/736x/aa/24/f6/aa24f6888d328d6d647f8d5a90dd86f4.jpg"),
  (9, "La légende de Zelda", "Vous jouez Link, un chevalier et cherchez à sauvez la princesse Zelda et le royaume d'Hyrule de la tyrannie de Ganon", true, false, "https://i.pinimg.com/736x/f2/ea/5a/f2ea5a3f1c432e6233deb1e7f0c4ce66.jpg"),
  (10, "Dance Dance Revolution", "Venez devenir le meilleur danseur de la boutique", true, false, "https://i.pinimg.com/736x/c8/b0/f0/c8b0f0c414d534e5ca9ee60f681b9efb.jpg");

create table lots (
  id int unsigned primary key auto_increment not null,
  name varchar(2000) not null,
  nb_lots int not null,
  nb_points_needed int not null,
  image varchar(255) null
);

insert into lots (id,name,nb_lots,nb_points_needed,image)
values
(1,"Anneau de pouvoir",5,15000,"https://i.pinimg.com/736x/cc/e4/5b/cce45b138bf47636408d04fd4c316980.jpg"),
(2,"Pokeball",20,2000,"https://i.pinimg.com/736x/20/91/97/209197c466d12b2bd33995042d6c5c70.jpg"),
(3,"Peluche de pacman",15,5000,"https://i.pinimg.com/736x/14/f6/d2/14f6d2e0aa5747c243d8dff7cdf48f2c.jpg"),
(4,"Peluche de fantôme",15,5000, "https://i.pinimg.com/736x/21/08/0e/21080e475bd597469b483f9a56aee234.jpg"),
(5,"Porte-clef arcade",30, 500, "https://i.pinimg.com/736x/08/93/44/08934468e016f73d896b7f0f99cb7e14.jpg"),
(6,"Pins de jeux (1)", 50,200, "https://i.pinimg.com/736x/b2/5b/00/b25b005b04e66a9ce273e26010f511ab.jpg"),
(7,"Patch de jeux vidéo", 50,300,"https://i.pinimg.com/736x/b9/bf/91/b9bf916c07fa10100a71d7347a51a447.jpg"),
(8,"Bottes de cowboy",10, 10000, "https://i.pinimg.com/736x/2a/5b/ae/2a5baeb49911f762ba957aec84d56094.jpg"),
(9,"Un Tshirt parmi une collection",25, 300, "https://i.pinimg.com/736x/4f/18/f0/4f18f011d6dda206029317a91b9d9a3e.jpg");

create table user (
  id int unsigned primary key auto_increment not null,
  pseudo varchar(150) not null,
  points int not null default 0,
  email varchar(100) not null,
  hashed_password varchar(100) not null,
  image varchar(250) null,
  is_admin boolean DEFAULT false
);

insert into user (id,pseudo,points,email,hashed_password,image, is_admin)
values
(1,"toto",0,"thomas-osana_student2024@wilder.school","123456789","https://upload.wikimedia.org/wikipedia/commons/c/c0/Z%C3%A9ro_plus_z%C3%A9ro_%C3%A9gale_la_t%C3%AAte_%C3%A0_TOTO.png", false),
(2,"dammedanny",400,"danny@email.com","$argon2id$v=19$m=19456,t=2,p=1$lvCsh6yJXGjleWhyLPQ5qw$KJzNeLo/8Wk/kGGBpbuZfXqS6yockv6eLGLa7lJ2v3Q","https://png.pngtree.com/png-vector/20241124/ourlarge/pngtree-charming-anime-character-with-a-sweet-smile-png-image_14191640.png", true);
-- !!! mot de passe damedanny est mdp12345

create table scores (
  id int unsigned primary key auto_increment not null,
  id_game int unsigned not null,
  id_user int unsigned not null,
  score int null,
  is_fav boolean default false,
  foreign key (id_game) references game(id),
  foreign key (id_user) references user(id)
);

insert into scores (id_game, id_user,score, is_fav)
values
(1,1,0,false),
(1,2,0,false),
(2,2,0,false),
(3,2,400,false),
(4,2,0,false),
(5,2,0,false),
(6,2,0,true),
(7,2,0,true),
(8,2,0,false),
(9,2,0,false),
(10,2,0,false);

create table exchanges (
  id int unsigned primary key auto_increment not null,
  id_lots int unsigned not null,
  id_user int unsigned not null,
  foreign key (id_lots) references lots(id),
  foreign key (id_user) references user(id)
);

insert into exchanges ( id_lots, id_user)
values
(1,1),
(4,2);