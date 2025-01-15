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
  (9, "La légende de Zelda", "Vous jouez Link, un chevalier et cherchez à sauvez la princesse Zelda et le royaume d'Hyrule de la tyrannie de Ganon", true, false, "https://i.pinimg.com/736x/f2/ea/5a/f2ea5a3f1c432e6233deb1e7f0c4ce66.jpg");

create table lots (
  id int unsigned primary key auto_increment not null,
  name varchar(2000) not null,
  nb_lots int not null,
  nb_points_needed int not null,
  image varchar(255) null
);

insert into lots (id,name,nb_lots,nb_points_needed,image)
values
(1,"anneau_de_pouvoir",5,150,"https://e7.pngegg.com/pngimages/837/290/png-clipart-the-lord-of-the-rings-the-fellowship-of-the-ring-sauron-one-ring-lord-of-the-rings-ring-gold.png"),
(2,"pokeball",5,200,"https://w7.pngwing.com/pngs/801/726/png-transparent-pokemon-pokeball-nintendo-ball-thumbnail.png");

create table user (
  id int unsigned primary key auto_increment not null,
  pseudo varchar(150) not null,
  points int not null default 0,
  email varchar(100) not null,
  password varchar(100) not null,
  image varchar(250) null
);

insert into user (id,pseudo,points,email,password,image)
values
(1,"toto",0,"thomas-osana_student2024@wilder.school","123456789","https://upload.wikimedia.org/wikipedia/commons/c/c0/Z%C3%A9ro_plus_z%C3%A9ro_%C3%A9gale_la_t%C3%AAte_%C3%A0_TOTO.png"),
(2,"dammedanny",200,"email@email.com","eU7HzL56P//?","https://png.pngtree.com/png-vector/20241124/ourlarge/pngtree-charming-anime-character-with-a-sweet-smile-png-image_14191640.png");