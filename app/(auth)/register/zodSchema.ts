import { z } from "zod";

// UserIdentity Schema
export const UserIdentitySchema = z.object({
  id: z.string(),
  user_id: z.string(),
  identity_data: z.record(z.any()).optional(),
  identity_id: z.string(),
  provider: z.string(),
  created_at: z.string().optional(),
  last_sign_in_at: z.string().optional(),
  updated_at: z.string().optional(),
});

// Factor Schema
export const FactorSchema = z.object({
  id: z.string(),
  friendly_name: z.string().optional(),
  factor_type: z.union([z.literal("totp"), z.literal("phone"), z.string()]),
  status: z.union([z.literal("verified"), z.literal("unverified")]),
  created_at: z.string(),
  updated_at: z.string(),
});

// UserAppMetadata Schema
export const UserAppMetadataSchema = z
  .object({
    provider: z.string().optional(),
  })
  .catchall(z.any());
// UserMetadata Schema
export const UserMetadataSchema = z.object({}).catchall(z.any());
// User Schema
export const UserSchema = z.object({
  id: z.string(),
  app_metadata: UserAppMetadataSchema,
  user_metadata: UserMetadataSchema,
  aud: z.string(),
  created_at: z.string(),
  email: z.string().optional(),
  email_confirmed_at: z.string().optional(),
  identities: z.array(UserIdentitySchema).optional(),
  is_anonymous: z.boolean().optional(),
  last_sign_in_at: z.string().optional(),
  phone: z.string().optional(),
  role: z.string().optional(),
  updated_at: z.string().optional(),
  confirmation_sent_at: z.string().optional(),
  recovery_sent_at: z.string().optional(),
  email_change_sent_at: z.string().optional(),
  new_email: z.string().optional(),
  new_phone: z.string().optional(),
  invited_at: z.string().optional(),
  action_link: z.string().optional(),
  confirmed_at: z.string().optional(),
  phone_confirmed_at: z.string().optional(),
  factors: z.array(FactorSchema).optional(),
});

// Session Schema
export const SessionSchema = z.object({
  provider_token: z.string().nullable().optional(),
  provider_refresh_token: z.string().nullable().optional(),
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
  expires_at: z.number().optional(),
  token_type: z.string(),
  user: UserSchema,
});

// Infer types
export type UserIdentity = z.infer<typeof UserIdentitySchema>;
export type Factor = z.infer<typeof FactorSchema>;
export type UserAppMetadata = z.infer<typeof UserAppMetadataSchema>;
export type UserMetadata = z.infer<typeof UserMetadataSchema>;
export type User = z.infer<typeof UserSchema>;
export type Session = z.infer<typeof SessionSchema>;

export const SignUpSessionSchema = z.object({
  session: SessionSchema,
});
