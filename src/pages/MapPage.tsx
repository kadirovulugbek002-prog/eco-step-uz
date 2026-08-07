import { useState } from "react";
import { containers } from "../data/content";
import NeighborhoodMap from "../components/map/NeighborhoodMap";
import ContainerDetailCard from "../components/map/ContainerDetailCard";
import ContainerList from "../components/map/ContainerList";
import TabBar from "../components/TabBar";

export default function MapPage() {
  const [selectedId, setSelectedId] = useState(containers[0].id);
  const selected = containers.find((c) => c.id === selectedId) ?? containers[0];

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <div className="mx-auto w-full max-w-[560px] flex-1 px-6 py-10">
        <h1 className="heading mb-1 text-[24px]">Konteynerlar xaritasi</h1>
        <p className="mb-6 text-[14px] text-ink-soft">
          Chilonzor-9 mahallasidagi barcha konteynerlar va ularning holati.
        </p>

        <NeighborhoodMap selectedId={selectedId} onSelect={setSelectedId} />

        <div className="mt-5">
          <ContainerDetailCard container={selected} />
        </div>

        <div className="mt-8">
          <h2 className="mb-3.5 text-[15px] font-bold text-ink">
            Barcha konteynerlar
          </h2>
          <ContainerList selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      </div>

        <div className="h-[68px]" />
      <TabBar />
    </div>
  );
}