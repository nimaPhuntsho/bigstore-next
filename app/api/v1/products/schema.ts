import { z } from "zod";

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

export const ProductSchema = z.object({
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

export const ItemSchema = z.object({
  limit: z.number(),
  products: z.array(ProductSchema),
  skip: z.number(),
  total: z.number(),
});

export const InternalApiSchema = z.object({
  success: z.boolean(),
  data: z.array(ProductSchema),
  status: z.number(),
  length: z.number().optional(),
});

// type Test = z.infer<typeof DimensionsSchema> | z.infer<typeof MetaSchema>;
// type Dimensions = z.infer<typeof DimensionsSchema>;
// type Meta = z.infer<typeof MetaSchema>;

// export function getTester(selector: string): Test {
//   const one: Dimensions = { type: "dimen", width: 10, height: 20, depth: 29 }; // Initialize with valid dimensions
//   const two: Meta = {
//     type: "meta",
//     createdAt: "",
//     updatedAt: "",
//     barcode: "",
//     qrCode: "",
//   };

//   if (selector === "meta") {
//     return two;
//   } else {
//     return one;
//   }
// }
