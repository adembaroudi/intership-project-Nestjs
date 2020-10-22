import { contactService } from "./contact.service";
import { ContactDto } from "./dto/contact.dto";
export declare class contactController {
    private contactService;
    constructor(contactService: contactService);
    addMessage(ContactDto: ContactDto, res: any): Promise<any>;
    getAllmsgs(): Promise<import("./contact.model").Contact>;
    getMsgById(id: String): Promise<import("./contact.model").Contact>;
    updateMsg(id: String, contactDto: ContactDto): Promise<import("./contact.model").Contact>;
    deleteMsg(id: String, res: any): Promise<any>;
}
