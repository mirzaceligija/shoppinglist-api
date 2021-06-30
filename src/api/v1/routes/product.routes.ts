import { createProductSchema } from '../schemas/product.schema';
import { Request, Response, Router } from 'express';
import requiresUser from '../middlewares/requiresUser';
import validateRequest from '../middlewares/validateRequest';
import { createProductHandler } from '../controllers/product.controller';

const router = Router();

// This is created for a testing purpose

// POST /api/v1/shopping/
router.post('', [requiresUser ,validateRequest(createProductSchema)], createProductHandler);

module.exports = router;