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
}

export default new gameRepository();
