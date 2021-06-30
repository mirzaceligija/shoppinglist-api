import { deleteShoppingListSchema, updateShoppingListSchema, createShoppingListSchema } from '../schemas/shoppingList.schema';
import { Request, Response, Router } from 'express';
import requiresUser from '../middlewares/requiresUser';
import validateRequest from '../middlewares/validateRequest';
import { createShoppingListHandler, deleteShoppingListHandler, getShoppingListHandler, updateShoppingListHandler, getShoppingListsReportHandler  } from '../controllers/shoppinglist.controller';

const router = Router();

// GET /api/v1/shopping
router.get('', requiresUser, getShoppingListsReportHandler);

/* 
 * 3. Korisnik je u mogucnosti da kreira novu shopping listu.
 */
// POST /api/v1/shopping/
router.post('', [requiresUser ,validateRequest(createShoppingListSchema)], createShoppingListHandler);

// GET /api/v1/shopping/:listId
router.get('/:listId', requiresUser, getShoppingListHandler);

// PUT /api/v1/shopping/:listId
router.put('/:listId', [requiresUser ,validateRequest(updateShoppingListSchema)], updateShoppingListHandler)

// DELETE /api/v1/shopping/:listId
router.delete('/:listId', [requiresUser ,validateRequest(deleteShoppingListSchema)], deleteShoppingListHandler)

module.exports = router;