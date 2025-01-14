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

create table user (
  id int unsigned primary key auto_increment not null,
  pseudo varchar(150) not null,
  points int not null default 0,
  email varchar(100) not null,
  password varchar(100) not null,
  image varchar(250) null
);