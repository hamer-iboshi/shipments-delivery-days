import { Request, Response, NextFunction } from 'express';
import { validate } from "class-validator";
import { plainToInstance } from 'class-transformer';

import { calculateEstimatedDays } from "../helpers/calculateEstimatedDays";
import { ShipmentDto } from "../dto/shipment.dto";
import { ShipmentsRepository } from "../repositories/shipment-repository";
import { Shipment, Status } from '../interfaces/Shipment';

export class ShipmentService {

    async getShipmentById(req: Request, res: Response) {
        const id  = typeof req.params.id === 'string' ? req.params.id : req.params.id[0];
        const shipmentsRepository = new ShipmentsRepository();
        const shipment = await shipmentsRepository.getShipmentById(id);
        if (!shipment) {
            return res.json({ error: 'Shipment not found' }).status(404);
        }

        return res.json(shipment);
    }

    async createShipment(req: Request, res: Response) {
        const shipment: ShipmentDto =  plainToInstance(ShipmentDto, req.body);

        const validationErrors = await validate(shipment);
        if (validationErrors.length > 0) {
            throw new Error("Invalid shipment data: " + JSON.stringify(validationErrors[0].constraints));
        }

        const estimatedDays = calculateEstimatedDays(shipment.origin, shipment.destination);
        
        const shipmentsRepository = new ShipmentsRepository();
        const shipmentData: Shipment = { ...shipment, estimatedDays };
        const newShipment = await shipmentsRepository.insertShipment(shipmentData);
        return res.json(newShipment);
    }

    async updateShipment(req: Request, res: Response) {
        const id  = typeof req.params.id === 'string' ? req.params.id : req.params.id[0];
        const updateData = req.body;
        const shipmentsRepository = new ShipmentsRepository();
        const shipment = await shipmentsRepository.getShipmentById(id);

        if (!shipment) {
            return res.json({ error: 'Shipment not found' }).status(404);
        }

        if (updateData.status && !Object.values(Status).includes(updateData.status)) {
            return res.json({ error: 'Invalid status value.'}).status(422);
        }

        const updatedShipment = { ...shipment, ...updateData };
        const result = await shipmentsRepository.updateShipment(id, updatedShipment, updatedShipment.status);
        return res.json(result);
    }
    
    async resetShipments(req: Request, res: Response) {
        const shipmentsRepository = new ShipmentsRepository();
        await shipmentsRepository.resetShipments();
        return res.json({ message: 'Shipments reset successfully' });
    }
}