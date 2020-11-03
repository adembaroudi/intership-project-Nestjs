import { Blog } from "./blog.model";
import { Model } from "mongoose";
import { BlogDto } from "./dto/blog.dto";
export declare class blogService {
    private readonly blogModel;
    private blog;
    constructor(blogModel: Model<Blog>);
    addBlog(blogDto: BlogDto): Promise<Blog>;
    getAllBlogs(): Promise<Blog>;
    getLatestBlog(): Promise<Blog>;
    getBlogById(id: String): Promise<Blog>;
    updateBlog(id: String, blogDto: BlogDto): Promise<Blog>;
    deleteBlog(id: String): Promise<Blog>;
    introBlog(id: String): Promise<any>;
    getLatestArticles(): Promise<Blog>;
    logoCompanyPic(file: any, id: any): Promise<Blog>;
    getLogo(id: any): Promise<Blog>;
}
