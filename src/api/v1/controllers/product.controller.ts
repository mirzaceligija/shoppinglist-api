import { NextFunction, Request, Response } from "express";
import {
    createProduct
} from "../services/product.service";

export async function createProductHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const product = await createProduct({ ...body });
  
    return res.send(product);
  } catch (e) {
      next(e)
  }
}