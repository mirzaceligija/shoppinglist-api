import mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document {
    name: string,
    qty: number
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, default: true, unique: true},
    },
    { timestamps: true }
);

const Product = mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;