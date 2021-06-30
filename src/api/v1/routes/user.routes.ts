import { createUserSchema, updateUserSchema } from './../schemas/user.schema';
import { Request, Response, Router } from 'express';
import { createUserHandler, updateUserHandler } from '../controllers/user.controller';
import validateRequest from '../middlewares/validateRequest';
import requiresUser from '../middlewares/requiresUser';

const router = Router();

// GET /api/users
router.get('', (req: Request, res: Response) => {
    res.status(200).send("Hello from Users [DEV]");
});

/* 
 * 1. Da bi se registrovao korisnik treba da posalje inicijalne podatke na rutu za registraciju (email + password).
 */
// POST /api/v1/users/
router.post('', validateRequest(createUserSchema), createUserHandler);

// PUT /api/v1/users/:userId
router.put('/:userId', [requiresUser ,validateRequest(updateUserSchema)], updateUserHandler);

module.exports = router;