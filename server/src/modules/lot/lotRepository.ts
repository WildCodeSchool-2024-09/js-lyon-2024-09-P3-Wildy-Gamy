import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Lot = {
  id: number;
  name: string;
  nb_lots: number;
  nb_points_needed: number;
  image: string;
};

type LotAccount = {
  lot_id: number;
  lot_image: string;
  user_id: number;
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

  async readImage(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select l.id as lot_id, l.image as lot_image, u.id as user_id from exchanges e join lots l on e.id_lots = l.id join user u on e.id_user = u.id where e.id_user = ?",
      [id],
    );
    return rows as LotAccount[];
  }

  async updateNbLot(lotId: number) {
    const [result] = await databaseClient.query<Result>(
      "update lots set nb_lots = nb_lots - 1 where id = ? and nb_lots > 0;",
      [lotId],
    );
    return result.affectedRows;
  }
}

export default new lotRepository();
