import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  pseudo: string;
  email: string;
  password: string;
  image: string;
};

class UserRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );

    return rows[0] as User;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from user");

    return rows as User[];
  }

  async create(user: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new category to the "category" table
    const [result] = await databaseClient.query<Result>(
      "insert into user (pseudo, email, password) values (?, ?, ?)",
      [user.pseudo, user.email, user.password],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async update(user: User) {
    // Execute the SQL UPDATE query to update an existing category in the "category" table
    const [result] = await databaseClient.query<Result>(
      "update user set pseudo = ?, email=?, image=? where id = ?",
      [user.pseudo, user.email, user.image, user.id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  async updatePassword(password: string, id: number) {
    const [result] = await databaseClient.query<Result>(
      "update user set password = ? where id = ?",
      [password, id],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing category from the "category" table
    const [result] = await databaseClient.query<Result>(
      "delete user game where id = ?",
      [id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new UserRepository();
