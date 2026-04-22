import travelDistanceFile from '../files/distances.json';
import { TravelDistance, Shipment } from '../interfaces/Shipment';

const TRAVEL_DISTANCE_PER_DAY = 800; // Assuming a driver travels 800 km per day

export function calculateEstimatedDays(origin?: string, destination?: string): number {
    const travelDistance: TravelDistance[] = travelDistanceFile;
    const distance = travelDistance.find(d => 
        d.state_1 === origin && d.state_2 === destination || 
        d.state_1 === destination && d.state_2 === origin
    )?.distance_km;

    if (distance === undefined) {
        throw new Error(`Distance not found for route from ${origin} to ${destination}`);
    }

    
    return Math.ceil(distance / TRAVEL_DISTANCE_PER_DAY);
}