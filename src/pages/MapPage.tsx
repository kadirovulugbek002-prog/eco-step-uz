import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NeighborhoodMap from "../components/map/NeighborhoodMap";
import ContainerDetailCard from "../components/map/ContainerDetailCard";
import ContainerList from "../components/map/ContainerList";
import TabBar from "../components/TabBar";
import { getMyProfile } from "../lib/auth";
import { fetchContainersForMahalla } from "../lib/containers";
import { useLanguage } from "../context/useLanguage";
import type { ContainerLocation } from "../types";

export default function MapPage() {
  const [containers, setContainers] = useState<ContainerLocation[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    getMyProfile()
      .then(async (profile) => {
        if (!profile) {
          setNotLoggedIn(true);
          return;
        }
        const list = await fetchContainersForMahalla(profile.mahalla_id);
        setContainers(list);
        if (list.length > 0) setSelectedId(list[0].id);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <p className="text-[14px] text-ink-soft">Yuklanmoqda...</p>
      </div>
    );
  }

  if (notLoggedIn) {
    return <Navigate to="/kirish" replace />;
  }

  const selected = containers.find((c) => c.id === selectedId) ?? containers[0];

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <div className="mx-auto w-full max-w-[560px] flex-1 px-6 py-10">
        <h1 className="heading mb-1 text-[24px]">{t("map_title")}</h1>
        <p className="mb-6 text-[14px] text-ink-soft">{t("map_subtitle")}</p>

        {error && (
          <p className="mb-4 rounded-[10px] bg-alert/10 p-3 text-[13px] font-medium text-alert">
            {error}
          </p>
        )}

        {containers.length === 0 && !error ? (
          <p className="rounded-[14px] border border-line bg-white p-5 text-[13.5px] text-ink-soft">
            Mahallangizda hozircha konteyner ro'yxatga olinmagan.
          </p>
        ) : (
          <>
            <NeighborhoodMap
              containers={containers}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />

            {selected && (
              <div className="mt-5">
                <ContainerDetailCard container={selected} />
              </div>
            )}

            <div className="mt-8">
              <h2 className="mb-3.5 text-[15px] font-bold text-ink">
                {t("map_allContainers")}
              </h2>
              <ContainerList
                containers={containers}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
          </>
        )}
      </div>

      <div className="h-[68px]" />
      <TabBar />
    </div>
  );
}