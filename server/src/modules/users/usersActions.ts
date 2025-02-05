import argon2 from "argon2";
import type { RequestHandler } from "express";
import { hashingOptions } from "../auth/authActions";
import scoresRepository from "../scores/scoresRepository";
import usersRepository from "./usersRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await usersRepository.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await usersRepository.read(userId);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const user = {
      id: Number.parseInt(req.params.id),
      pseudo: req.body.pseudo,
      email: req.body.email,
      image: req.body.image,
    };

    if (user.pseudo == null || user.email == null) {
      res.sendStatus(400).json({});
    } else {
      const affectedRows = await usersRepository.update(user);

      if (affectedRows === null) {
        res.sendStatus(404);
      } else {
        res.json(user);
      }
    }
  } catch (err) {
    next(err);
  }
};

const editPassword: RequestHandler = async (req, res, next) => {
  try {
    const user = {
      id: Number.parseInt(req.params.id),
      password: req.body.password,
      newPassword: req.body.newPassword,
      email: req.body.email,
    };
    const userInfo = await usersRepository.readByEmailWithPassword(
      req.body.email,
    );

    const hashed_password = await argon2.hash(user.password, hashingOptions);
    req.body.password = undefined;

    const new_hashed_password = await argon2.hash(
      user.newPassword,
      hashingOptions,
    );
    req.body.newPassword = undefined;

    if (hashed_password == null) {
      res.sendStatus(400).json({});
    } else {
      const verified = await argon2.verify(
        userInfo.hashed_password,
        user.password,
      );

      if (verified) {
        const affectedRows = await usersRepository.updatePassword(
          new_hashed_password,
          user.id,
        );
        if (affectedRows === 0) {
          res.json({ errorNumber: 404, error: "Utilisateur non trouvé" });
        } else {
          res.json({ message: "Mot de passe mis à jour avec succès" });
        }
      } else {
        res.sendStatus(422);
      }
    }
  } catch (err) {
    next(err);
  }
};

const editPoints: RequestHandler = async (req, res, next) => {
  try {
    const user = {
      id: Number.parseInt(req.params.id),
    };
    if (user.id == null) {
      res.sendStatus(400).json({});
    } else {
      const affectedRows = await usersRepository.updatePoints(user.id);
      if (affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(201);
      }
    }
  } catch (err) {
    next(err);
  }
};

const editBuyLot: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    if (userId === 0) {
      res.sendStatus(404);
    } else {
      const affectedRows = await usersRepository.updateBuyLot(userId);
      if (affectedRows == null) {
        res.sendStatus(404);
      } else {
        res.sendStatus(201);
      }
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      pseudo: req.body.pseudo,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
      image: req.body.image,
    };

    if (
      newUser.pseudo == null ||
      newUser.email == null ||
      newUser.hashed_password == null
    ) {
      res.sendStatus(400).json({});
    } else {
      req.body.id_user = await usersRepository.create(newUser);

      next();
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.id);
    const affectedRowsScores = await scoresRepository.delete(userId);

    const affectedRows = await usersRepository.delete(userId);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  read,
  edit,
  editPassword,
  editPoints,
  editBuyLot,
  add,
  destroy,
};
