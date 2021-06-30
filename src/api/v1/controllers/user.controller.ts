import { Request, Response, NextFunction } from "express";
import { omit, get } from "lodash";
import { createUser, findUser, findAndUpdate } from "../services/user.service";
import log from "../../../../config/logger";

export async function createUserHandler(req: Request, res: Response) {
    try {
      const user = await createUser(req.body);
      return res.send(omit(user.toJSON(), "password"));
    } catch (e:any) {
      log.error(e);
      return res.status(409).send(e.message);
    }
}

  
/*
 *  X. Korisnik može promijeniti password
 */
export async function updateUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = get(req, "user._id");
    const userId = get(req, "params.userId");
    const update = req.body;

    const user = await findUser({ _id: userId });

    if (!user) {
      return res.sendStatus(404);
    }

    if (String(user._id) !== userId || String(user._id) != id) {
      return res.sendStatus(401);
    }

    const updatedUser = await findAndUpdate({ _id: userId }, update, { new: false });
    return res.send(updatedUser);
  } catch (e) {
    log.error(e);
    next(e);
  }
}