// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import TaxiMap from "./TaxiMap";
// import LocationAutocomplete from "./LocationAutocomplete";
// import AvailableDrivers from "./AvailableDrivers";

// type VehicleType = "BIKES" | "AUTOS" | "CARS";
// interface Props {
//   vehicle?: VehicleType;
// }

// type Location = {
//   address: string;
//   lat: number;
//   lng: number;
// };

// export default function TaxiRidePanel({ vehicle }: Props) {
//   const [pickup, setPickup] = useState<Location | null>(null);
//   const [drop, setDrop] = useState<Location | null>(null);
//   const [search, setSearch] = useState(false);

//   return (
//     <aside className="lg:col-span-1 mx-6 space-y-4">
//       <div className="bg-white border rounded-xl shadow-sm p-4 space-y-4">
//         <h3 className="text-lg font-semibold">
//           {vehicle ? `Book a ${vehicle}` : "Select a vehicle"}
//         </h3>
//         <div className="flex flex-row">
//           <TaxiMap pickup={pickup ?? undefined} drop={drop ?? undefined} />
//           <div className="flex flex-col p-4">
//             <LocationAutocomplete
//               label="Pickup location"
//               value={pickup?.address ?? ""}
//               onSelect={(place) => {
//                 setPickup(place);
//               }}
//             />

//             <LocationAutocomplete
//               label="Drop location"
//               value={drop?.address ?? ""}
//               onSelect={(place) => {
//                 setDrop(place);
//               }}
//             />
            
//             <Button
//               className="mt-4 w-full"
//               disabled={!vehicle || !pickup || !drop}
//               onClick={() => setSearch(true)}
//             >
//           {!vehicle && (
//             <p className="">
//               Select a Vehicle To
//             </p> ) }
//             Find {vehicle ?? "Rides"}
//             </Button>


//           </div>

//         </div>
//         <AvailableDrivers
//           enabled={search}
//           vehicle={vehicle!}
//           pickupLat={pickup?.lat ?? 0}
//           pickupLng={pickup?.lng ?? 0}
//         />
//       </div>
//     </aside>
//   );
// }
