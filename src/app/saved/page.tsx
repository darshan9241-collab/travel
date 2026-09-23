import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import SavedStories from "@/components/SavedStories";
import { getSortedStories } from "@/data/stories";
import { resolvePhoto } from "@/lib/images";

export const metadata: Metadata = {
  title: "Saved Stories",
  description: "Stories you've saved for later on Wanderlouge.",
};

const headerPhoto = resolvePhoto({
  src: "/images/stories/pondicherry-entrance.jpg",
  alt: "The white Puducherry entrance arch at the edge of the French Colony",
  tone: "gold",
  variant: "coast",
});

export default function SavedPage() {
  const stories = getSortedStories();

  return (
    <>
      <PageHeader
        label="For Later"
        heading="Saved Stories"
        description="The stories you've bookmarked to come back to, kept right here in your browser."
        photo={headerPhoto}
      />
      <section className="bg-white-warm py-20 sm:py-24">
        <Container>
          <SavedStories stories={stories} />
        </Container>
      </section>
    </>
  );
}
