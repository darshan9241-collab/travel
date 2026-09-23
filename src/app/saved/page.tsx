import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import SavedStories from "@/components/SavedStories";
import { getSortedStories } from "@/data/stories";

export const metadata: Metadata = {
  title: "Saved Stories",
  description: "Stories you've saved for later on Wanderlouge.",
};

export default function SavedPage() {
  const stories = getSortedStories();

  return (
    <>
      <PageHeader
        label="For Later"
        heading="Saved Stories"
        description="The stories you've bookmarked to come back to, kept right here in your browser."
      />
      <section className="bg-white-warm py-20 sm:py-24">
        <Container>
          <SavedStories stories={stories} />
        </Container>
      </section>
    </>
  );
}
