
import DashboardShell from "../components/DashboardShell";
import CategoryCarousel from "../components/CategoryCarousel";
import DashboardContent from "../components/DashboardContent";



export default async function CustomerDashboardPage(){
  return (
      <DashboardShell>
        <div className="space-y-6">
          <CategoryCarousel />
          <DashboardContent/>
        </div>
      </DashboardShell>
  );
}
