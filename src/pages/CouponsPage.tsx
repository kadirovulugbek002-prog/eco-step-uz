import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import RewardFilter from "../components/rewards/RewardFilter";
import RewardCard from "../components/rewards/RewardCard";
import RedeemSuccessModal from "../components/rewards/RedeemSuccessModal";
import TabBar from "../components/TabBar";
import { getMyProfile } from "../lib/auth";
import { fetchRewards, redeemReward } from "../lib/rewards";
import type { RewardCategory, RewardItem } from "../types";

export default function CouponsPage() {
  const [category, setCategory] = useState<RewardCategory | "hammasi">("hammasi");
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState<RewardItem[]>([]);
  const [redeemed, setRedeemed] = useState<RewardItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [redeeming, setRedeeming] = useState(false);

  useEffect(() => {
    Promise.all([getMyProfile(), fetchRewards()])
      .then(([profile, rewardList]) => {
        if (!profile) {
          setNotLoggedIn(true);
          return;
        }
        setPoints(profile.points);
        setRewards(rewardList);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () =>
      category === "hammasi"
        ? rewards
        : rewards.filter((r) => r.category === category),
    [category, rewards]
  );

  async function handleRedeem(reward: RewardItem) {
    if (points < reward.costPoints || redeeming) return;
    setRedeeming(true);
    setError("");
    try {
      await redeemReward(reward.id);
      setPoints((p) => p - reward.costPoints);
      setRedeemed(reward);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Almashtirishda xatolik yuz berdi.");
    } finally {
      setRedeeming(false);
    }
  }

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

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <div className="mx-auto w-full max-w-[640px] flex-1 px-6 py-10">
        <h1 className="heading mb-1 text-[24px]">Kupon do'koni</h1>
        <p className="mb-5 text-[14px] text-ink-soft">
          Ballaringizni foydali mukofotlarga almashtiring.
        </p>

        <div className="mb-6 rounded-[14px] bg-ink px-5 py-4">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-white/60">
            Joriy balans
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-[28px] font-semibold text-white">
              {points.toLocaleString("uz-UZ")}
            </span>
            <span className="text-[14px] font-semibold text-white/60">ball</span>
          </div>
        </div>

        {error && (
          <p className="mb-4 rounded-[10px] bg-alert/10 p-3 text-[13px] font-medium text-alert">
            {error}
          </p>
        )}

        <RewardFilter active={category} onChange={setCategory} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              userPoints={points}
              onRedeem={handleRedeem}
            />
          ))}
        </div>
      </div>

      <div className="h-[68px]" />
      <TabBar />

      {redeemed && (
        <RedeemSuccessModal
          reward={redeemed}
          onClose={() => setRedeemed(null)}
        />
      )}
    </div>
  );
}