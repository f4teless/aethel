import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Aethel - A Realm on the Brink of Collapse",
		short_name: "Aethel",
		description: "A world once governed by logic... now broken. Only the Architects can restore the logic.",
		start_url: "/",
		display: "standalone",
		background_color: "#202C34",
		theme_color: "#202C34",
		orientation: "portrait-primary",
		scope: "/",
		lang: "en",
		dir: "ltr",
		categories: ["games", "education", "entertainment"],
		icons: [
			{
				src: "/favicon/favicon-96x96.png",
				sizes: "96x96",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/favicon/web-app-manifest-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/favicon/web-app-manifest-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
		screenshots: [
			{
				src: "/feature-classes.webp",
				sizes: "1200x630",
				type: "image/webp",
				form_factor: "wide",
				label: "Aethel - CodeRealm Gameplay",
			},
		],
	};
}
