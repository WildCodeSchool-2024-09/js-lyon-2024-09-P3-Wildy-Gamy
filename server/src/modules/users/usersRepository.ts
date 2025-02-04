import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  is_admin: boolean;
  id: number;
  pseudo: string;
  email: string;
  hashed_password: string;
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

  async readByEmailWithPassword(email: string) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where email = ?",
      [email],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as User;
  }

  async create(user: Omit<User, "id" | "is_admin">) {
    // Execute the SQL INSERT query to add a new category to the "category" table
    const [result] = await databaseClient.query<Result>(
      "insert into user (pseudo, email, hashed_password) values (?, ?, ?)",
      [user.pseudo, user.email, user.hashed_password],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async update(user: Omit<User, "is_admin" | "hashed_password">) {
    const [rows] = await databaseClient.query<Rows>(
      "update user set pseudo = ?, email = ?, image = ? where id = ?",
      [user.pseudo, user.email, user.image, user.id],
    );

    // Return how many rows were affected
    return rows[0] as User;
  }

  async updatePassword(hashed_password: string, id: number) {
    const [result] = await databaseClient.query<Result>(
      "update user set hashed_password = ? where id = ?",
      [hashed_password, id],
    );
    return result.affectedRows;
  }

  async updatePoints(id: number) {
    const [result] = await databaseClient.query<Result>(
      "update user u join (select id_user, coalesce(sum(score), 0) as total_points from scores group by id_user) s on u.id = s.id_user set u.points = s.total_points where u.id = ?",
      [id],
    );
    return result.affectedRows;
  }

  async updateBuyLot(userId: number) {
    const [result] = await databaseClient.query<Result>(
      "update user u set u.points = u.points - (select l.nb_points_needed from exchanges e join lots l on e.id_lots = l.id where e.id_user = u.id order by e.id desc limit 1) where u.id = ?",
      [userId],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing category from the "category" table
    const [result] = await databaseClient.query<Result>(
      "delete from user where id = ?",
      [id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new UserRepository();
