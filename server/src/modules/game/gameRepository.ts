import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Game = {
  id: number;
  name: string;
  principle: string;
  in_room: number;
  is_playable: number;
  image: string;
};

class gameRepository {
  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from game where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Game;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "game" table
    const [rows] = await databaseClient.query<Rows>("select * from game");

    // Return the array of items
    return rows as Game[];
  }

  async create(game: Omit<Game, "id">) {
    // Execute the SQL INSERT query to add a new category to the "category" table
    const [result] = await databaseClient.query<Result>(
      "insert into game (name, principle, in_room, is_playable, image) values (?, ?, ?, ?, ?)",
      [game.name, game.principle, game.in_room, game.is_playable, game.image],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async update(game: Game) {
    // Execute the SQL UPDATE query to update an existing category in the "category" table
    const [result] = await databaseClient.query<Result>(
      "update game set name = ?, principle=?, in_room=?, is_playable=?, image=? where id = ?",
      [
        game.name,
        game.principle,
        game.in_room,
        game.is_playable,
        game.image,
        game.id,
      ],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing category from the "category" table
    const [result] = await databaseClient.query<Result>(
      "delete from game where id = ?",
      [id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  async readScores(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select user.id, game.name as game, scores.score from scores join game on scores.id_game = game.id join user on scores.id_user = user.id where scores.id_user = ?",
      [id],
    );
    return rows;
  }
}

export default new gameRepository();
