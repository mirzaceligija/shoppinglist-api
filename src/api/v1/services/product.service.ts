import {
    DocumentDefinition,
  } from "mongoose";

  import Product, { ProductDocument } from "../models/product.model";

  export function createProduct(input: DocumentDefinition<ProductDocument>) {
    return Product.create(input);
  }