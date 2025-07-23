"use client";

import { useState, useEffect } from "react";
import ClientBackgroundWrapper from "@/components/old/ClientBackgroundWrapper";
import { communityImages, getRandomItem } from "@/lib/constants";
import CommunityMain from "@/components/AlternateCommunity";

const CommunityPage = () => {
	const [randomBg, setRandomBg] = useState(communityImages[0]);

	useEffect(() => {
		setRandomBg(getRandomItem(communityImages));
	}, []);

	return (
		<ClientBackgroundWrapper backgroundImage={`url(${randomBg})`}>
			<link rel="preload" as="image" href={randomBg} />
			<div className="min-h-screen text-white">
				<CommunityMain />
			</div>
		</ClientBackgroundWrapper>
	);
};

export default CommunityPage;