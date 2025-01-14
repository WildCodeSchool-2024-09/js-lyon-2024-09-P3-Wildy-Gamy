import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

import gameActions from "./modules/game/gameActions";

router.get("/api/games", gameActions.browse);
router.get("/api/games/:id", gameActions.read);

/* ************************************************************************* */

import lotActions from "./modules/lot/lotActions";

router.get("/api/lots", lotActions.browse);
router.get("/api/lots/:id", lotActions.read);

/* ************************************************************************* */

export default router;
