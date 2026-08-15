import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ProfileHeader from "../components/profile/ProfileHeader";
import PointsSummary from "../components/profile/PointsSummary";
import PointsHistory from "../components/profile/PointsHistory";
import SettingsSection from "../components/profile/SettingsSection";
import TabBar from "../components/TabBar";
import { getMyProfile, fetchMahallaName } from "../lib/auth";
import type { DbProfile } from "../lib/auth";

export default function ProfilePage() {
  const [profile, setProfile] = useState<DbProfile | null>(null);
  const [mahallaName, setMahallaName] = useState("");
  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  useEffect(() => {
    getMyProfile()
      .then(async (p) => {
        if (!p) {
          setNotLoggedIn(true);
          return;
        }
        setProfile(p);
        const name = await fetchMahallaName(p.mahalla_id);
        setMahallaName(name);
      })
      .catch(() => setNotLoggedIn(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <p className="text-[14px] text-ink-soft">Yuklanmoqda...</p>
      </div>
    );
  }

  if (notLoggedIn || !profile) {
    return <Navigate to="/kirish" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <div className="mx-auto w-full max-w-[560px] flex-1 px-6 py-10">
        <ProfileHeader profile={profile} mahallaName={mahallaName} />

        <div className="mt-7">
          <PointsSummary profile={profile} />
        </div>

        <div className="mt-8">
          <PointsHistory />
        </div>

        <div className="mt-8">
          <SettingsSection />
        </div>
      </div>

      <div className="h-[68px]" />
      <TabBar />
    </div>
  );
}