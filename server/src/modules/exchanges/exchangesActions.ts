import type { RequestHandler } from "express";
import exchangesRepository from "./exchangesRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const exchanges = await exchangesRepository.readAll();

    res.json(exchanges);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const exchangeId = {
      id: Number(req.params.id),
      id_lots: Number(req.body.id_lots),
      id_user: Number(req.body.auth.id),
    };
    const exchange = await exchangesRepository.read(exchangeId);

    if (exchange == null) {
      res.sendStatus(404);
    } else {
      res.json(exchange);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newExchange = {
      id: Number(req.params.id),
      id_lots: req.body.id_lots,
      id_user: Number(req.body.auth.id),
    };

    if (
      newExchange.id == null ||
      newExchange.id_lots == null ||
      newExchange.id_user == null
    ) {
      res.sendStatus(400).json({});
    } else {
      const insertId = await exchangesRepository.create(newExchange);

      res.status(201).json({ insertId });
    }
  } catch (err) {
    next(err);
  }
};

const addBuyLot: RequestHandler = async (req, res, next) => {
  try {
    const lot = {
      id: Number(req.params.id),
      id_user: Number(req.body.auth.id),
      id_lot: Number(req.body.id_lot),
    };
    if (lot.id_lot == null) {
      res.sendStatus(404);
    } else {
      const affectedRows = await exchangesRepository.addBuyLot(
        lot.id_user,
        lot.id_lot,
      );
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

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const exchangeId = Number.parseInt(req.params.id);
    const affectedRows = await exchangesRepository.delete(exchangeId);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, addBuyLot, destroy };
