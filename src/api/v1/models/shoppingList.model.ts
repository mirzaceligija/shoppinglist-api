import { ProductDocument } from './product.model';
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";

export interface ShoppingListDocument extends mongoose.Document {
    user: UserDocument["_id"];
    title: string;
    products: [{
        product: ProductDocument["_id"],
        qty: number
    }];
    createdAt: Date;
    updatedAt: Date;
}

const ShoppingListSchema = new mongoose.Schema(
    {
        listId: {
        type: String,
        required: true,
        unique: true,
        default: () => nanoid(10),
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        title: {type: String, required: true, default: true, unique: true},
        products: [{
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
            qty: Number
        }],
    },
    { timestamps: true }
);

const ShoppingList = mongoose.model<ShoppingListDocument>("ShoppingList", ShoppingListSchema);

export default ShoppingList;