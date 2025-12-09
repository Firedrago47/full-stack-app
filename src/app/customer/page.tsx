import { Suspense } from "react";
import CustomerExplorePage from "./components/CustomerExplore";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomerExplorePage />
    </Suspense>
  );
}
