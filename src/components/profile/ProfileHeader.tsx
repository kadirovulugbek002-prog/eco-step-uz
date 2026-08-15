import { useLanguage } from "../../context/useLanguage";
import type { DbProfile } from "../../lib/auth";

interface Props {
  profile: DbProfile;
  mahallaName: string;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("uz-UZ", { month: "long", year: "numeric" });
}

export default function ProfileHeader({ profile, mahallaName }: Props) {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-5">
      <div className="heading flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-primary text-2xl text-white">
        {initials(profile.full_name)}
      </div>
      <div>
        <h1 className="text-[20px] font-bold text-ink">{profile.full_name}</h1>
        <p className="mt-0.5 font-mono text-[13px] text-ink-soft">
          {profile.email}
        </p>
        <p className="mt-1 text-[13px] text-ink-soft">
          {t("profile_memberLine")
            .replace("{mahalla}", mahallaName)
            .replace("{date}", formatDate(profile.created_at))}
        </p>
      </div>
    </div>
  );
}