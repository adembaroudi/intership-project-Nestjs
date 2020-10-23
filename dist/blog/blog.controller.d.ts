import { blogService } from "./blog.service";
import { BlogDto } from "./dto/blog.dto";
export declare class blogController {
    private blogService;
    constructor(blogService: blogService);
    addUser(res: any, blogDto: BlogDto): Promise<any>;
    getAllBlogs(res: any): Promise<any>;
    getBlogById(id: string, res: any): Promise<any>;
    getTheLatest(res: any): Promise<any>;
    introBlogs(id: String): Promise<any>;
    updateBlog(id: string, res: any, blogDto: BlogDto): Promise<any>;
    deleteUser(id: String, res: any): Promise<any>;
    uploadLogoCompany(res: any, file: any, id: any): Promise<any>;
    getFiles(getimage: String, res: any): any;
}
