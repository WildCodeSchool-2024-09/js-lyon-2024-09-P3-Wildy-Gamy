import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Exchange = {
  id: number;
  id_lots: number;
  id_user: number;
};

class exchangesRepository {
  async read(exchange: Exchange) {
    const [rows] = await databaseClient.query<Rows>(
      "select user.pseudo from user, lots.name from lots join user on user.id = ? join lots on lots.id = ? where id_user = ?",
      [exchange.id_user, exchange.id_lots, exchange.id_user],
    );

    return rows[0] as Exchange;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from exchanges");

    return rows as Exchange[];
  }

  async create(exchange: Exchange) {
    // Execute the SQL INSERT query to add a new exchange to the "exchanges" table
    const [result] = await databaseClient.query<Result>(
      "insert into exchanges (id_lots, id_user) values (?, ?)",
      [exchange.id_lots, exchange.id_user],
    );

    // Return the ID of the newly inserted exchange
    return result.insertId;
  }

  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing exchange from the "exchanges" table
    const [result] = await databaseClient.query<Result>(
      "delete from exchanges where id = ?",
      [id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new exchangesRepository();
