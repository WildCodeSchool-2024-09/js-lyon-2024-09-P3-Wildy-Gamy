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
      Score {data.game} : {data.score}
    </p>
  );
}

export default GameScore;
