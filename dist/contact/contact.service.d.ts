import { Contact } from "./contact.model";
import { Model } from "mongoose";
import { ContactDto } from "./dto/contact.dto";
export declare class contactService {
    private readonly contactModel;
    private contact;
    constructor(contactModel: Model<Contact>);
    addMessage(contactDto: ContactDto): Promise<boolean>;
    getAllMsgs(): Promise<Contact>;
    getMsgsById(id: String): Promise<Contact>;
    updateMsg(id: String, contactDto: ContactDto): Promise<Contact>;
    deleteMsg(id: String): Promise<Contact>;
}
