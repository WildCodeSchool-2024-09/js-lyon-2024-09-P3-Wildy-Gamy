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

export default { browse, read };
