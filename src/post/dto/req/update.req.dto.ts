import { PartialType } from "@nestjs/swagger";
import { CreateDto } from "./create.req.dto";

export class UpdatePostDto extends PartialType(CreateDto) {
}