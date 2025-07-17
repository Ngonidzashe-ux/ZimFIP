import { HeroSection } from "../components/HeroSection";
import { ContentBlocks } from "../components/ContentBlocks";
import { InfoCardsSection } from "../components/InfoCardsSection";
import { StatsSection } from "../components/StatsSection";
import { FeaturedListingsSection } from "../components/FeaturedListingsSection";
import { MarketplaceFeaturesSection } from "../components/MarketplaceFeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import BlogUpdatesSection from "../components/BlogUpdatesSection";

function Home() {
  return (
    <div className="bg-zimfip-green">
      <HeroSection />
      <ContentBlocks />
      <InfoCardsSection />
      <StatsSection />
      <FeaturedListingsSection />
      <MarketplaceFeaturesSection />
      <TestimonialsSection />
      <BlogUpdatesSection />
    </div>
  );
}

export default Home;
