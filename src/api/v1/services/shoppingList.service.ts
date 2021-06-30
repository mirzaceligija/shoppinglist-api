import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
  } from "mongoose";

  import mongoose from "mongoose";

  import ShoppingList, { ShoppingListDocument } from "../models/shoppingList.model";

  export function createShoppingList(input: DocumentDefinition<ShoppingListDocument>) {
    return ShoppingList.create(input);
  }
  
  export function findShoppingList(
    query: FilterQuery<ShoppingListDocument>,
    options: QueryOptions = { lean: true }
  ) {
    return ShoppingList.findOne(query, {}, options).populate("products.product");
  }
  
  export function findAndUpdate(
    query: FilterQuery<ShoppingListDocument>,
    update: UpdateQuery<ShoppingListDocument>,
    options: QueryOptions
  ) {
    return ShoppingList.findOneAndUpdate(query, update, options).populate("products.product");
  }
  
  export function deleteShoppingList(query: FilterQuery<ShoppingListDocument>) {
    return ShoppingList.deleteOne(query);
  }
    
  export async function getProductCount(query: FilterQuery<ShoppingListDocument>) {

    // Cast String to ObjectId
    const userId = mongoose.Types.ObjectId(query.user);

    // NOTE: Zbog slanja preko POSTMAN-a koristio sam string, ukoliko se proslijedi Date object
    // ne treba cast, tu bi sintaksa bila slijedeća: $let: query.endDate, $gte: query.startDate
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);

    return ShoppingList.aggregate([
      { $match: {
        $and: [
          { createdAt: { $lt: endDate, $gte: startDate },},
          { user: userId}
        ]
      }},
      { $unwind: "$products" },
      { $group: {
            _id: "$products.product",
            count: { $sum: "$products.qty" }
        }
      },
    ]);

  }