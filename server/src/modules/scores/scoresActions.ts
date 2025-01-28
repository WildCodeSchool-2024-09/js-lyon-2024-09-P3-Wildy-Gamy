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
    };
    if (score.newScore == null) {
      res.sendStatus(400).json({});
    } else {
      const affectedRows = await scoresRepository.updateScores(
        score.newScore,
        score.id_user,
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

export default { browse, read, editScores };
