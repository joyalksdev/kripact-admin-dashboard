import StatsBar from "../components/Dashboard/StatsBar";
import QuickActions from "../components/Dashboard/QuickActions";
import DonationSummary from "../components/Dashboard/DonationSummary";
import ActivityFeed from "../components/Dashboard/ActivityFeed";
import ChartsSection from "../components/Dashboard/ChartsSection";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <StatsBar />

      {/* Actions + Donations */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <QuickActions />
        <div className="xl:col-span-1">
          <DonationSummary />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ActivityFeed />
        <ChartsSection />
      </div>
    </div>
  );
};

export default Dashboard;
