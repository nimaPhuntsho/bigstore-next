import { number, Schema, z } from "zod";

// Define the dimensions schema
const DimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
});

// Define the meta schema
const MetaSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  barcode: z.string(),
  qrCode: z.string().url(),
});

// Define the review schema (assuming a simple structure for now)
export const ReviewSchema = z.object({
  reviewerEmail: z.string(),
  comment: z.string(),
  rating: z.number(),
  reviewerName: z.string(),
  date: z.string(),
});

export const orderSchema = z.object({
  availabilityStatus: z.string(),
  brand: z.string().optional(),
  category: z.string(),
  description: z.string(),
  dimensions: DimensionsSchema,
  discountPercentage: z.number(),
  id: z.number(),
  images: z.array(z.string().url()),
  meta: MetaSchema,
  minimumOrderQuantity: z.number(),
  price: z.number(),
  rating: z.number(),
  returnPolicy: z.string(),
  reviews: z.array(ReviewSchema),
  shippingInformation: z.string(),
  sku: z.string(),
  stock: z.number(),
  tags: z.array(z.string()),
  thumbnail: z.string().url(),
  title: z.string(),
  warrantyInformation: z.string(),
  weight: z.number(),
});

const extendedProductSchema = orderSchema.extend({ quantity: z.number() });
export type ProductSchemaType = z.infer<typeof orderSchema>;
export type CartItem = z.infer<typeof extendedProductSchema>;

export const OrderSchema = z.array(
  extendedProductSchema.pick({
    id: true,
    quantity: true,
    price: true,
  })
);

export const ItemSchema = z.object({
  limit: z.number(),
  products: z.array(orderSchema),
  skip: z.number(),
  total: z.number(),
});
