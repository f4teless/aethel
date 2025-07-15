"use client";

import { useState, useEffect } from "react";
import ClientBackgroundWrapper from "@/components/ClientBackgroundWrapper";
import { LazyCommunityMain } from "@/components/LazyComponents";
import { communityImages, getRandomItem } from "@/lib/constants";
import { usePerformanceMonitor } from "@/hooks/usePerformance";

const CommunityPage = () => {
	usePerformanceMonitor("CommunityPage");
	const [randomBg, setRandomBg] = useState(communityImages[0]); // Use first image as default

	useEffect(() => {
		// Set random background after mount to avoid hydration mismatch
		setRandomBg(getRandomItem(communityImages));
	}, []);

	return (
		<ClientBackgroundWrapper backgroundImage={`url(${randomBg})`}>
			<link rel="preload" as="image" href={randomBg} />
			<div className="min-h-screen text-white">
				{/* Main Community Content - Lazy Loaded */}
				<LazyCommunityMain />
			</div>
		</ClientBackgroundWrapper>
	);
};

export default CommunityPage;
