import { PartialType } from "@nestjs/swagger";
import { CreateDto } from "./create.req.dto";
import { IsOptional } from "class-validator";

export class UpdatePostDto extends PartialType(CreateDto) {

}