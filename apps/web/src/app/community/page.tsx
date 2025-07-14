import { communityImages, getRandomItem } from "../../lib/constants";
import ClientBackgroundWrapper from "@/components/ClientBackgroundWrapper";
import CommunityMain from "@/components/CommunityMain";

const CommunityPage = () => {
  const randomBg = getRandomItem(communityImages);

  return (
    <ClientBackgroundWrapper backgroundImage={`url(${randomBg})`}>
      <link rel="preload" as="image" href={randomBg} />
      <CommunityMain />
    </ClientBackgroundWrapper>
  );
};

export default CommunityPage;
