import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes

import exchangesActions from "./modules/exchanges/exchangesActions";

router.get("/api/exchanges", exchangesActions.browse);
router.get("/api/exchanges/:id", exchangesActions.read);
router.post("/api/exchanges", exchangesActions.add);
router.delete("/api/exchanges/:id", exchangesActions.destroy);

// ************************************************************************* */

import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

import gameActions from "./modules/game/gameActions";

router.get("/api/games", gameActions.browse);
router.get("/api/games/:id", gameActions.read);
router.post("/api/games", gameActions.add);
router.put("/api/games/:id", gameActions.edit);
router.delete("/api/games/:id", gameActions.destroy);

/* ************************************************************************* */

import lotActions from "./modules/lot/lotActions";

router.get("/api/lots", lotActions.browse);
router.get("/api/lots/:id", lotActions.read);

/* ************************************************************************* */

import usersActions from "./modules/users/usersActions";

router.get("/api/users", usersActions.browse);
router.get("/api/users/:id", usersActions.read);
router.put("/api/users/:id", usersActions.edit);
router.delete("/api/users/:id", usersActions.destroy);

/* ************************************************************************* */
import scoresActions from "./modules/scores/scoresActions";

router.get("/api/scores", scoresActions.browse);
router.get("/api/scores/:id", scoresActions.read);
router.put("/api/scores/:id", scoresActions.editScores);
router.post("/api/scores", scoresActions.addScore);
router.get("/api/favorite?:params", scoresActions.readFav);
router.get("/api/allfavorites", scoresActions.readAllFav);
router.put("/api/favorite", scoresActions.editFav);

/* ************************************************************************* */

import authActions from "./modules/auth/authActions";

router.post("/api/login", authActions.login);
router.post(
  "/api/users",
  authActions.hashPassword,
  usersActions.add,
  scoresActions.addScoreStart,
);

router.put("/api/users_password/:id", usersActions.editPassword);

export default router;
