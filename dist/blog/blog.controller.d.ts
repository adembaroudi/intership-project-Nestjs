import { blogService } from "./blog.service";
import { BlogDto } from "./dto/blog.dto";
export declare class blogController {
    private blogService;
    constructor(blogService: blogService);
    addUser(res: any, blogDto: BlogDto): Promise<any>;
    getAllBlogs(res: any): Promise<any>;
    getBlogById(id: string, res: any): Promise<any>;
    getTheLatest(res: any): Promise<any>;
    latestArticle(id: String, res: any): Promise<import("./blog.model").Blog>;
    introBlogs(id: String): Promise<any>;
    updateBlog(id: string, res: any, blogDto: BlogDto): Promise<any>;
    deleteUser(id: String, res: any): Promise<any>;
}
