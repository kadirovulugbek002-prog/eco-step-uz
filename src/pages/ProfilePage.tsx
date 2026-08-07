import ProfileHeader from "../components/profile/ProfileHeader";
import PointsSummary from "../components/profile/PointsSummary";
import PointsHistory from "../components/profile/PointsHistory";
import SettingsSection from "../components/profile/SettingsSection";
import TabBar from "../components/TabBar";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <div className="mx-auto w-full max-w-[560px] flex-1 px-6 py-10">
        <ProfileHeader />

        <div className="mt-7">
          <PointsSummary />
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