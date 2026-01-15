import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Footer } from "./components/footer";
import { ProtocolPage } from "./pages/protocol-page";
import { ParticipantsPage } from "./pages/participants-page";
import { TeamsPage } from "./pages/teams-page";
import { AwardsPage } from "./pages/awards-page";
import { RegulationsPage } from "./pages/regulations-page";

function HomePage() {
  return (
    <>
      <Hero />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/protocol" element={<ProtocolPage />} />
            <Route path="/participants" element={<ParticipantsPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/awards" element={<AwardsPage />} />
            <Route path="/regulations" element={<RegulationsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}