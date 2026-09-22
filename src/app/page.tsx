import Hero from "@/components/Hero";
import Introduction from "@/components/home/Introduction";
import FeaturedStories from "@/components/home/FeaturedStories";
import GalleryPreview from "@/components/home/GalleryPreview";
import AboutPreview from "@/components/home/AboutPreview";
import Philosophy from "@/components/home/Philosophy";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <FeaturedStories />
      <GalleryPreview />
      <AboutPreview />
      <Philosophy />
      <Newsletter />
    </>
  );
}
