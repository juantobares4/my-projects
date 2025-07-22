import { Router } from "express";
import { getAllReviews, postReview, updateReview, deleteReview, getReviewsByGame } from "../controllers/review.controllers.js";
import { validateToken } from "../helpers/validateToken.js";
import { blockedRouteFor } from "../helpers/blockedRouteFor.js";

const routerReview = Router();

routerReview.get('/', getAllReviews);

routerReview.get('/games/:gameId', getReviewsByGame);

routerReview.post('/', validateToken, postReview);

routerReview.put('/:id', validateToken, blockedRouteFor('gamer'), updateReview);

routerReview.delete('/:id', validateToken, deleteReview);

export default routerReview;