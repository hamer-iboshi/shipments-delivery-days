import { describe, expect, beforeAll, it, jest, afterAll } from "@jest/globals"
import { ShipmentService } from '../src/services/shipment.service';
import { Request, Response } from 'express';


describe('Shipment Service', () => {
    let shipmentService: ShipmentService;
    
    beforeAll(() => {
        shipmentService = new ShipmentService();
    });

    afterAll(async () => {
        const req = {} as unknown as Request;
        const mockResponse = {json: jest.fn()}
        await shipmentService.resetShipments(req, mockResponse as unknown as Response);
    });

    it('should create a shipment successfully', async () => {
        const shipmentData = {
            origin: 'New York',
            destination: 'Ohio',
            weight: 100,
        };
        const request = { body: shipmentData } as Request; // Mocking the request object
        const mockResponse = {
            status: jest.fn().mockReturnThis(), // Returns 'this' for chaining .status().json()
            json: jest.fn()
        } as unknown as Response;

        await shipmentService.createShipment(request, mockResponse);
        expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({ id: expect.any(Number) }));
        expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({ origin: 'New York' }));
        expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({ destination: 'Ohio' }));
        expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({ estimatedDays:  2}));
    });

    it('should fail to create a shipment with invalid data', async () => {
        const shipmentData = {
            origin: 'New York',
            destination: 'Los Angeles',
            weight: 100,
        };
        const request = { body: shipmentData } as Request; // Mocking the request object
        const mockResponse = {
            status: jest.fn().mockReturnThis(), // Returns 'this' for chaining .status().json()
            json: jest.fn()
        } as unknown as Response;
        
        try {
            expect(await shipmentService.createShipment(request, mockResponse)).rejects.toThrow('Invalid shipment data');
        } catch (error: any) {
            console.log("Caught error:", error.message);
            expect(error.message).toMatch(/Destination must be one of the following states:/);
        }
    });

    it('should retrieve a shipment by ID', async () => {
        const request = { params: { id: '1' } } as unknown as Request; // Mocking the request object
        const mockResponse = {
            json: jest.fn()
        } as unknown as Response;
        
        await shipmentService.getShipmentById(request, mockResponse);
        expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({"destination": "Ohio", "estimatedDays": 2, "origin": "New York", "weight": 100}));
    });

    it('should update status of a shipment', async () => {
        const request = { params: { id: '1' }, body: { status: 'In Transit' } } as unknown as Request; // Mocking the request object
        const mockResponse = {
            json: jest.fn()
        } as unknown as Response;
        const result = await shipmentService.updateShipment(request, mockResponse);
        expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({"destination": "Ohio", "estimatedDays": 2, "origin": "New York", "status": "In Transit", "weight": 100}));
    });
});