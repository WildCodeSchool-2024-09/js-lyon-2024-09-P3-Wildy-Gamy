import type { RequestHandler } from "express";
import scoresRepository from "./scoresRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const scores = await scoresRepository.readAll();

    res.json(scores);
  } catch (err) {
    next(err);
  }
};

const readFav: RequestHandler = async (req, res, next) => {
  try {
    const ids = {
      id_game: Number(req.body.id_game),
      id_user: Number(req.body.id_user),
    };

    if (ids.id_game == null || ids.id_user == null) {
      res.sendStatus(400).json({});
    } else {
      const fav = await scoresRepository.readFav(ids.id_game, ids.id_user);

      res.json(fav);
    }
  } catch (err) {
    next(err);
  }
};

const readAllFav: RequestHandler = async (req, res, next) => {
  try {
    const ids = {
      id_user: Number(req.body.id_user),
    };

    if (ids.id_user == null) {
      res.sendStatus(400).json({});
    } else {
      const fav = await scoresRepository.readAllFav(ids.id_user);

      res.json(fav);
    }
  } catch (err) {
    next(err);
  }
};

const editFav: RequestHandler = async (req, res, next) => {
  try {
    const user = {
      id_game: Number(req.body.id_game),
      id_user: Number(req.body.id_user),
      is_fav: Boolean(req.body.is_fav),
    };

    if (user.id_game == null || user.id_user == null) {
      res.sendStatus(400).json({});
    } else {
      const affectedRows = await scoresRepository.updateFav(user);

      if (affectedRows == null) {
        res.sendStatus(404);
      } else {
        res.json(user);
      }
    }
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const scoreId = Number(req.params.id);
    const score = await scoresRepository.read(scoreId);

    if (score == null) {
      res.sendStatus(404);
    } else {
      res.json(score);
    }
  } catch (err) {
    next(err);
  }
};

const editScores: RequestHandler = async (req, res, next) => {
  try {
    const score = {
      id_user: Number(req.params.id),
      newScore: Number(req.body.newScore),
      id_game: Number(req.body.id_game),
    };
    if (score.newScore == null) {
      res.sendStatus(400).json({});
    } else {
      const affectedRows = await scoresRepository.updateScores(
        score.newScore,
        score.id_user,
        score.id_game,
      );
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

const addScore: RequestHandler = async (req, res, next) => {
  try {
    const newScore = {
      id_user: req.body.id_user,
      id_game: req.body.id_game,
      score: req.body.score,
    };

    if (
      newScore.id_user == null ||
      newScore.id_game == null ||
      newScore.score == null
    ) {
      res.sendStatus(400).json({});
    } else {
      const insertId = await scoresRepository.create(newScore);
      res.status(201).json({ insertId });
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  readFav,
  readAllFav,
  read,
  editFav,
  editScores,
  addScore,
};
