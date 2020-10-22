import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { contactController } from "./contact.controller";
import { contactService } from "./contact.service";
import { contactsSchema } from "./schemas/contact.schema";

@Module({
    imports:[
        MongooseModule.forFeature([{name:"contact",schema:contactsSchema}])
    ],
controllers:[contactController],
providers:[contactService]
})

export class contactModule{

}
