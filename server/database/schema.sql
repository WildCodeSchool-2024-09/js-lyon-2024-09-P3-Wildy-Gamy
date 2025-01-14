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
  (2,"Mario","Plombier perdu dans un monde sous-terrain qui cherche a sauver son ami Luigi",true,true,"https://prod-printler-front-as.azurewebsites.net/media/photo/166695.jpg?mode=crop&width=638&height=900&rnd=0.0.1");

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