import type { RequestHandler } from "express";
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
      id: Number(req.params.id),
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: req.body.password,
      image: req.body.image,
    };

    if (user.pseudo == null || user.email == null || user.password == null) {
      res.sendStatus(400).json({});
    } else {
      const affectedRows = await usersRepository.update(user);

      if (affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
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
      password: req.body.password,
      image: req.body.image,
    };

    if (
      newUser.pseudo == null ||
      newUser.email == null ||
      newUser.password == null
    ) {
      res.sendStatus(400).json({});
    } else {
      const insertId = await usersRepository.create(newUser);

      res.status(201).json({ insertId });
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);

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

export default { browse, read, edit, add, destroy };
