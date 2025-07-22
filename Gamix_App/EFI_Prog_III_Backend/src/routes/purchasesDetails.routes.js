import { Router } from "express";
import { getAllPurchaseDetail, postPurchaseDetail } from "../controllers/purchaseDetails.controllers.js";
const routerPurchaseDetail = Router();

routerPurchaseDetail.get('/', getAllPurchaseDetail);

routerPurchaseDetail.post('/', postPurchaseDetail); // http://localhost:3001/Purchases POST


export default routerPurchaseDetail;