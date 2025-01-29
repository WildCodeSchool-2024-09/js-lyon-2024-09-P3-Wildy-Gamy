interface GameScoreProps {
  data: {
    id: number;
    game: string;
    score: number;
  };
}

function GameScore({ data }: GameScoreProps) {
  return (
    <p>
      Meilleur score sur {data.game} : {data.score}
    </p>
  );
}

export default GameScore;
