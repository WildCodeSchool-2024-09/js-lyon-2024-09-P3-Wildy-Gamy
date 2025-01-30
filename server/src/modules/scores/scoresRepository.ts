import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Score = {
  id: number;
  id_game: number;
  id_user: number;
  scores: number;
  is_fav: boolean;
};

class ScoresRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from scores where id = ?",
      [id],
    );
    return rows[0] as Score;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from scores");

    return rows as Score[];
  }

  async updateScores(newScore: number, id_user: number, id_game: number) {
    const [result] = await databaseClient.query<Result>(
      "update scores set score = ? where id_user = ? and id_game = ?",
      [newScore, id_user, id_game],
    );
    return result.affectedRows;
  }

  async create(score: { id_user: number; id_game: number; score: number }) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO scores (id_user, id_game, score) VALUES (?, ?, ?)",
      [score.id_user, score.id_game, score.score],
    );

    return result.insertId;
  }
}

export default new ScoresRepository();
