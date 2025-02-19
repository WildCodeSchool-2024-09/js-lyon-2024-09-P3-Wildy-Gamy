import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import authActions from "./modules/auth/authActions";
import exchangesActions from "./modules/exchanges/exchangesActions";

router.get("/api/exchanges", exchangesActions.browse);
router.get("/api/exchanges/:id", exchangesActions.read);
router.post("/api/exchanges", exchangesActions.add);
router.post(
  "/api/exchangesLot",
  authActions.verifyToken,
  exchangesActions.addBuyLot,
);
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
router.get("/api/gamesScores", authActions.verifyToken, gameActions.readScores);

/* ************************************************************************* */

import lotActions from "./modules/lot/lotActions";

router.get("/api/lots", lotActions.browse);
router.get("/api/lots/:id", lotActions.read);
router.get("/api/lotsImage", authActions.verifyToken, lotActions.readImage);
router.put("/api/lotsNbPoints/:id", lotActions.editNbLot);

/* ************************************************************************* */

import usersActions from "./modules/users/usersActions";

router.get("/api/users", usersActions.browse);
router.get("/api/user", authActions.verifyToken, usersActions.read);
router.put("/api/users", authActions.verifyToken, usersActions.edit);
router.put(
  "/api/usersPoints",
  authActions.verifyToken,
  usersActions.editPoints,
);
router.put(
  "/api/usersBuyPoints",
  authActions.verifyToken,
  usersActions.editBuyLot,
);
router.delete("/api/users", authActions.verifyToken, usersActions.destroy);

/* ************************************************************************* */
import scoresActions from "./modules/scores/scoresActions";

router.get("/api/scores", scoresActions.browse);
router.get("/api/score", authActions.verifyToken, scoresActions.read);
router.put("/api/scores", authActions.verifyToken, scoresActions.editScores);
router.post("/api/scores", scoresActions.addScore);
router.get(
  "/api/favorite?:params",
  authActions.verifyToken,
  scoresActions.readFav,
);
router.get(
  "/api/allfavorites",
  authActions.verifyToken,
  scoresActions.readAllFav,
);
router.put("/api/favorite", authActions.verifyToken, scoresActions.editFav);

/* ************************************************************************* */

router.post("/api/login", authActions.login);
router.post(
  "/api/users",
  authActions.hashPassword,
  usersActions.add,
  scoresActions.addScoreStart,
);

router.put(
  "/api/users_password",
  authActions.verifyToken,
  usersActions.editPassword,
);

export default router;
