import { contactService } from "./contact.service";
import { ContactDto } from "./dto/contact.dto";
export declare class contactController {
    private contactService;
    constructor(contactService: contactService);
    addMessage(ContactDto: ContactDto, res: any): Promise<any>;
    getAllmsgs(): Promise<import("./contact.model").Contact>;
    getMsgById(idmsg: String): Promise<import("./contact.model").Contact>;
    updateMsg(idmsg: String, contactDto: ContactDto): Promise<import("./contact.model").Contact>;
    deleteMsg(idmsg: String, res: any): Promise<any>;
}
