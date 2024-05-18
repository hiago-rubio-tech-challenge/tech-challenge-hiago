import Joi from "joi";

export interface CheckoutBody {
  client: {
    id: string;
    name: string;
  };
  products: {
    id: string;
    name: string;
    category: string;
    price: number;
  }[];
  totalValue: number;
  totalItens: number;
}

const checkoutSchema = Joi.object({
  client: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
  }).required(),
  products: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().required(),
      }).required()
    )
    .required(),
  totalValue: Joi.number().required(),
  totalItens: Joi.number().required(),
});

export function validateCheckout(body: CheckoutBody) {
  return checkoutSchema.validate(body);
}
