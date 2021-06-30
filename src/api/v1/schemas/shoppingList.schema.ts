import { object, string, array, number, ref } from "yup";

/* 
 * 4. Listu proizvoda (ime prozivoda, kolicina ) korisnik moze poslati prilikom kreiranja ili modifikacijom liste nakndadno
 */
const payload = {
    body: object({
      title: string().required("Title is required"),
      products: array()
        .of(
            object().shape({
                product: string().required("Product is required"),
                qty: number().required("Product quantity is required"),
            })
        )
        .notRequired(),
    }),
};

const params = {
    params: object({
      listId: string().required("ID is required"),
    }),
};

export const createShoppingListSchema = object({
    ...payload,
});

export const updateShoppingListSchema = object({
    ...params,
    ...payload,
});

export const deleteShoppingListSchema = object({
    ...params,
});