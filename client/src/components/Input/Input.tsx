import { useEffect, useState } from "react";
import "./Input.css";

interface gameProps {
  id: number;
  name: string;
  principle: string;
  in_room: number;
  is_playable: number;
  image: string;
}

interface setGamesProps {
  games: gameProps[];
  setGames: React.Dispatch<React.SetStateAction<gameProps[]>>;
}

function Input({ setGames }: setGamesProps) {
  const [listJeux, setListJeux] = useState<gameProps[]>([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games`)
      .then((res) => res.json())
      .then((data) => {
        setListJeux(data);
      });
  }, []);

  const parseInput = (input: string) => {
    const dictionnaire: gameProps[] = [];

    listJeux.map((value) => {
      if (value.name.toLowerCase().includes(input.toLowerCase())) {
        dictionnaire.push(value);
      }
    });
    setGames(dictionnaire);
  };

  return (
    <>
      <label>
        <input
          className="input"
          name="myInput"
          placeholder="Find a game"
          type="text"
          onChange={(e: { currentTarget: { value: string } }) =>
            parseInput(e.currentTarget.value)
          }
        />
      </label>
    </>
  );
}

export default Input;
