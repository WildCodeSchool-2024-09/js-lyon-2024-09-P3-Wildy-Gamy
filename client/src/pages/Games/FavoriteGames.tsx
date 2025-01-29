// import { useEffect, useState } from "react";
// import GameList from "../../components/GameList";
// import "./GamesList.css";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";

// interface gameProps {
//   id: number;
//   name: string;
//   principle: string;
//   in_room: number;
//   is_playable: number;
//   image: string;
// }

// interface favGames {
//   list: [idGame: number];
// }

// function FavoritesList() {
//   const [games, setGames] = useState([] as [] | gameProps[]);
//   const [favorites, setFavorites] = useState([] as [] | favGames);

//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_URL}/api/allfavorites`)
//       .then((response) => response.json())
//       .then((data) => {
//         setFavorites(data);
//       });
//   }, []);

//   //   favorites.map((id: number) => {
//   //     useEffect(() => {
//   //       fetch(`${import.meta.env.VITE_API_URL}/api/games/${id}`)
//   //         .then((response) => response.json())
//   //         .then((data) => {
//   //           setGames(data);
//   //         });
//   //     }, []);
//   //   });

//   return (
//     <>
//       <Carousel>
//         {games.length === 0
//           ? [<p key="">Il n'y a pas de jeux pour l'instant</p>]
//           : games.map((game) => (
//               <article className="elemCar" key={game.id}>
//                 <GameList data={game} />
//               </article>
//             ))}
//       </Carousel>
//     </>
//   );
// }

// export default FavoritesList;
