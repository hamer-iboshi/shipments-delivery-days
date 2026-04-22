import nodeLocalStorage from 'node-localstorage';
import { Shipment, Status } from '../interfaces/Shipment';

export class ShipmentsRepository {
    private localStorage: nodeLocalStorage.LocalStorage;
    
    constructor() {
        const storagePath = process.env.NODE_ENV === 'test' ? './shipments-test' : './shipments';
        this.localStorage = new nodeLocalStorage.LocalStorage(storagePath);
    }

    async insertShipment(shipment: Shipment): Promise<Shipment> {
        const id = this.localStorage.length + 1;
        this.localStorage.setItem( id.toString(), JSON.stringify(shipment));
        return { id, ...shipment };
    }

    async getShipmentById(key: string): Promise<Shipment | null> {
        const shipment = this.localStorage.getItem( key );
        return shipment ? JSON.parse(shipment) : null;
    }

    async updateShipment(id: string, shipment: Shipment, status: Status): Promise<Shipment> {
        shipment.status = status;
        this.localStorage.setItem(id, JSON.stringify(shipment));
        return shipment;
    }

    async resetShipments() {
        this.localStorage.clear();
    }
}