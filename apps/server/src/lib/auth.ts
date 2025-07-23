import { env } from "cloudflare:workers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "../db/schema/auth";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",

		schema: schema,
	}),
	trustedOrigins: [env.CORS_ORIGIN],
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
		twitter: {
			clientId: process.env.TWITTER_CLIENT_ID as string,
			clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
		},
        google: {
            prompt: "select_account", 
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        linkedin: { 
            clientId: process.env.LINKEDIN_CLIENT_ID as string, 
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string, 
        }, 
		spotify: { 
            clientId: process.env.SPOTIFY_CLIENT_ID as string, 
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string, 
        }, 
		roblox: { 
            clientId: process.env.ROBLOX_CLIENT_ID as string, 
            clientSecret: process.env.ROBLOX_CLIENT_SECRET as string, 
        }, 
		twitch: { 
            clientId: process.env.TWITCH_CLIENT_ID as string, 
            clientSecret: process.env.TWITCH_CLIENT_SECRET as string, 
        }, 
		tiktok: { 
            clientId: process.env.TIKTOK_CLIENT_ID as string, 
            clientSecret: process.env.TIKTOK_CLIENT_SECRET as string, 
            clientKey: process.env.TIKTOK_CLIENT_KEY as string, 
        }, 
		apple: { 
            clientId: process.env.APPLE_CLIENT_ID as string, 
            clientSecret: process.env.APPLE_CLIENT_SECRET as string, 
            // Optional
            appBundleIdentifier: process.env.APPLE_APP_BUNDLE_IDENTIFIER as string, 
        }, 
		discord: { 
            clientId: process.env.DISCORD_CLIENT_ID as string, 
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string, 
        }, 
		microsoft: { 
            clientId: process.env.MICROSOFT_CLIENT_ID as string, 
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string, 
            // Optional
            tenantId: 'common', 
            prompt: "select_account", // Forces account selection
        }, 
		facebook: { 
            clientId: process.env.FACEBOOK_CLIENT_ID as string, 
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string, 
        }, 
	},
	secret: env.BETTER_AUTH_SECRET,
	baseURL: env.BETTER_AUTH_URL,
})