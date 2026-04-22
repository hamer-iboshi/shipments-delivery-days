export interface TravelDistance {
    state_1: string;
    state_2: string;
    distance_km: number;
}

export interface Shipment {
    id?: number;
    origin?: string;
    destination?: string;
    weight?: number;
    estimatedDays?: number;
    status?: Status;
}

export enum Status {
    Pending = "Pending",
    InTransit = "In Transit",
    Delivered = "Delivered"
}