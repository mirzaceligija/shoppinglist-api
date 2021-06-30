import { object, string, number } from "yup";

const payload = {
    body: object({
      name: string().required("Product name is required"),
    })
};

export const createProductSchema = object({
    ...payload,
});
