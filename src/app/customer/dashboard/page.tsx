import ProtectedLayout from "@/components/ProtectedLayout";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { getCurrentUser } from "@/lib/auth/current-user";
import CategoryCarousel from "@/components/dashboard/CategoryCarousel";
import FeaturedGrid from "@/components/dashboard/FeaturedGrid";
import ItemList from "@/components/dashboard/ItemList";


export default async function CustomerDashboardPage() {
  const user = await getCurrentUser();


  return (
    <ProtectedLayout allowedRoles={["CUSTOMER"]}>
      <DashboardShell>
        <div className="space-y-6">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold">Good day{user?.name ? `, ${user.name}` : "!"}</h1>
              <p className="text-sm text-muted-foreground">Find groceries, order food, book cabs & services — all in one place.</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                placeholder="Search for items, restaurants or services"
                className="input input-md w-[420px] rounded-md border px-4 py-2"
              />
              <button className="btn btn-primary">Search</button>
            </div>
          </header>


          {/* Categories */}
          <CategoryCarousel />


          {/* Featured / Promotions */}
          <FeaturedGrid />


          {/* Items list + sidebar filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1 space-y-4">
              <div className="p-4 bg-white border rounded">
                <h3 className="text-lg font-semibold">Filters</h3>
                <div className="mt-3 space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> <span>Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> <span>Vegan</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> <span>Fast Delivery</span>
                  </label>
                </div>
              </div>


              <div className="p-4 bg-white border rounded">
                <h3 className="text-lg font-semibold">Near you</h3>
                <p className="text-sm text-muted-foreground mt-2">Restaurants & shops delivering within 5km</p>
              </div>
            </aside>


            <section className="lg:col-span-3 space-y-4">
              <ItemList />
            </section>
          </div>
        </div>
      </DashboardShell>
    </ProtectedLayout>
  );
}