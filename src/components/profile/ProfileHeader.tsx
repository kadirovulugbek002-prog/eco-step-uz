import { profileUser } from "../../data/content";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ProfileHeader() {
  return (
    <div className="flex items-center gap-5">
      <div className="heading flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-primary text-2xl text-white">
        {initials(profileUser.name)}
      </div>
      <div>
        <h1 className="text-[20px] font-bold text-ink">{profileUser.name}</h1>
        <p className="mt-0.5 font-mono text-[13px] text-ink-soft">
          +998 {profileUser.phone}
        </p>
        <p className="mt-1 text-[13px] text-ink-soft">
          {profileUser.mahalla} mahallasi · {profileUser.memberSince}dan beri
        </p>
      </div>
    </div>
  );
}