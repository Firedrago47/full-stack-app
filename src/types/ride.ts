import { RideStatus } from "@prisma/client";

export type VehicleType = "BIKE" | "AUTO" | "CAR";


export type DriverSummary = {
  id: string;
  name: string;
  rating?: number | null;
  vehicle?: {
    model: string;
    plate: string;
  } | null;
};

export type LatLng = {
  lat: number;
  lng: number;
};


export type RidePublic = {
  id: string;
  status: RideStatus;
  pickupAddress: string;
  dropAddress: string | null;
  driver: {
    id: string;
    name: string;
  } | null;
};

export interface RideStatusResponse {
  ride: RidePublic;
}
