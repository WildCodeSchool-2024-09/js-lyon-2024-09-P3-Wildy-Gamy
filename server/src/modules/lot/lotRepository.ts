import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Lot = {
  id: number;
  name: string;
  nb_lots: number;
  nb_points_needed: number;
  image: string;
};

class lotRepository {
  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from lots where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Lot;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "game" table
    const [rows] = await databaseClient.query<Rows>("select * from lots");

    // Return the array of items
    return rows as Lot[];
  }
}

export default new lotRepository();
