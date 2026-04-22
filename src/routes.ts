import { Router } from "express";
import { ShipmentService } from "./services/shipment.service";

const router = Router();
const shipmentService = new ShipmentService();

router.get("/:id", shipmentService.getShipmentById);

router.post("", shipmentService.createShipment);

router.patch("/:id", shipmentService.updateShipment);

router.delete("/reset", shipmentService.resetShipments);

export default router;