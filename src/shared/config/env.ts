import { z } from 'zod';

const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string().default('BASQOR'),

  // Database
  DATABASE_URL: z.string().url(),

  // Authentication
  NEXT_PUBLIC_AUTH_DOMAIN: z.string().url(),
  NEXT_PUBLIC_AUTH_CLIENT_ID: z.string(),
  NEXT_PUBLIC_AUTH_CLIENT_SECRET: z.string(),
  NEXT_PUBLIC_AUTH_CALLBACK_URL: z.string().url(),
  NEXT_PUBLIC_AUTH_SIGN_OUT_REDIRECT_URL: z.string().url(),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),

  // Payment
  NEXT_PUBLIC_HYPERPAY_BASE_URL: z.string().url(),
  HYPERPAY_MERCHANT_ID: z.string(),
  HYPERPAY_SECRET_KEY: z.string(),
  HYPERPAY_CURRENCY: z.enum(['SAR', 'USD']).default('SAR'),

  // VIN Decoder
  VIN_DECODER_API_KEY: z.string(),
  VIN_DECODER_BASE_URL: z.string().url(),

  // SMS
  SMS_GATEWAY_API_KEY: z.string(),
  SMS_GATEWAY_SENDER_ID: z.string(),

  // Email
  EMAIL_SERVICE: z.enum(['sendgrid', 'mailgun', 'ses']).default('sendgrid'),
  SENDGRID_API_KEY: z.string().optional(),
  MAILGUN_API_KEY: z.string().optional(),
  MAILGUN_DOMAIN: z.string().optional(),
  SES_REGION: z.string().optional(),
  SES_ACCESS_KEY: z.string().optional(),
  SES_SECRET_KEY: z.string().optional(),

  // Google
  GOOGLE_API_KEY: z.string().optional(),
  GOOGLE_MAPS_CLIENT_ID: z.string().optional(),

  // Monitoring
  SENTRY_DSN: z.string().optional(),
  SENTRY_ENVIRONMENT: z.string().optional(),
});

export const env = envSchema.parse(process.env);
