import LandingPage from "./LandingPage";
import { fetchMainContent } from "@/api/BlockApi";

export default async function Home() {
  const content = await fetchMainContent();

  return <LandingPage mainContent={content} />;
}
