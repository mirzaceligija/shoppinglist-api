import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import {
  createShoppingList,
  findShoppingList,
  findAndUpdate,
  deleteShoppingList,
  getProductCount
} from "../services/shoppingList.service";

export async function createShoppingListHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = get(req, "user._id");
    const body = req.body;
  
    const list = await createShoppingList({ ...body, user: userId });
  
    return res.send(list);
  } catch (e) {
    next(e);
  }
}
  
  /*
   *  6. Korisnik moze vrsiti modifikacije samo na listama koje je sam kreirao
   */
export async function updateShoppingListHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = get(req, "user._id");
    const listId = get(req, "params.listId");
    const update = req.body;

    const list = await findShoppingList({ listId });

    if (!list) {
      return res.sendStatus(404);
    }

    if (String(list.user) !== userId) {
      return res.sendStatus(401);
    }

    const updatedList = await findAndUpdate({ listId }, update, { new: true });

    return res.send(updatedList);
  } catch (e) {
    next(e)
  }
  
}

export async function getShoppingListHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = get(req, "user._id");
    const listId = get(req, "params.listId");
    const list = await findShoppingList({ listId });

    if (!list) {
      return res.sendStatus(404);
    }

    if (String(list.user) !== String(userId)) {
      return res.sendStatus(401);
    }

    return res.send(list);
  } catch (e) {
    next(e);
  }
}
  
export async function deleteShoppingListHandler(req: Request, res: Response, next: NextFunction) {

  try {
    const userId = get(req, "user._id");
    const listId = get(req, "params.listId");

    console.log(userId);
    console.log(listId);

    const list = await findShoppingList({ listId });

    if (!list) {
      return res.sendStatus(404);
    }

    if (String(list.user) !== String(userId)) {
      return res.sendStatus(401);
    }

    await deleteShoppingList({ listId });

    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

export async function getShoppingListsReportHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = get(req, "user._id");
    const endDate = get(req, "body.endDate");
    const startDate = get(req, "body.startDate");

    const report = await getProductCount({user: userId, startDate: startDate, endDate: endDate});

    return res.send(report);
  } catch (e) {
    next(e);
  }
}