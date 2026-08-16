import { supabase } from "./supabaseClient";
import type { RewardItem } from "../types";

export async function fetchRewards(): Promise<RewardItem[]> {
  const { data, error } = await supabase
    .from("rewards")
    .select("id, name, description, cost_points, category, emoji")
    .eq("is_active", true)
    .order("cost_points");

  if (error) throw error;

  return (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    description: r.description,
    costPoints: r.cost_points,
    category: r.category as RewardItem["category"],
    emoji: r.emoji,
  }));
}

export async function redeemReward(rewardId: string): Promise<void> {
  const { error } = await supabase.rpc("redeem_reward", {
    _reward_id: rewardId,
  });
  if (error) throw error;
}