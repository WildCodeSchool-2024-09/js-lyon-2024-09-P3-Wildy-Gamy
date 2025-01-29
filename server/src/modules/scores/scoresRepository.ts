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

  async readFav(id_game: number, id_user: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select is_fav from scores where id_game = ? and id_user = ?",
      [id_game, id_user],
    );
    return rows[0] as Score;
  }

  async readAllFav(id_user: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select id_game where is_fav=true and id_user = ?",
      [id_user],
    );
    return rows[0] as Score;
  }

  async updateFav(score: Omit<Score, "id" | "scores">) {
    const [rows] = await databaseClient.query<Rows>(
      "update scores set is_fav = ? where id_game = ? and id_user = ?",
      [score.is_fav, score.id_game, score.id_user],
    );
    return rows[0] as Score;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from scores");

    return rows as Score[];
  }

  async addAll() {}
}

export default new ScoresRepository();
