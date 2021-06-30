import { createUserSessionSchema } from './../schemas/user.schema';
import { Request, Response, Router } from 'express';
import validateRequest from '../middlewares/validateRequest';
import requiresUser from '../middlewares/requiresUser';
import { createUserSessionHandler, getUserSessionsHandler, invalidateUserSessionHandler } from '../controllers/session.controller';

const router = Router();

// GET /api/v1/sessions
router.get('', requiresUser, getUserSessionsHandler);

/* 
 * 2. Nakon registracije korisniku ima mogucnost da se loguje (email + password) i dobije autentifikacijski token
 */
// POST /api/v1/sessions
router.post('', validateRequest(createUserSessionSchema), createUserSessionHandler);

// DELETE /api/v1/sessions
router.delete('', requiresUser, invalidateUserSessionHandler);

module.exports = router;