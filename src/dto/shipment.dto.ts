import { Contains, IsNotEmpty, IsNumber, IsString, IsIn } from 'class-validator';
const AVAILABLE_STATES = ["California","Texas","Florida","New York","Pennsylvania","Illinois","Ohio","Georgia","North Carolina"];

export class ShipmentDto {
    @IsNotEmpty()
    @IsString()
    @IsIn(AVAILABLE_STATES, { message: `Origin must be one of the following states: ${AVAILABLE_STATES.join(", ")}` })
    origin?: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(AVAILABLE_STATES, { message: `Destination must be one of the following states: ${AVAILABLE_STATES.join(", ")}` })
    destination?: string;

    @IsNumber()
    weight?: number;
}