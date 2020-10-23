import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Blog } from "./blog.model";
import { Model } from "mongoose";
import { BlogDto } from "./dto/blog.dto";
@Injectable()
export class blogService {
  private blog: Blog[] = [];
  constructor(@InjectModel("blog") private readonly blogModel: Model<Blog>) {}
  async addBlog(blogDto: BlogDto): Promise<Blog> {
    const newBlog = await new this.blogModel(blogDto);
    return newBlog.save();
  }
  async getAllBlogs(): Promise<Blog> {
    const allBlogs = await this.blogModel.find();
    return allBlogs;
  }
  async getLatestBlog(): Promise<Blog> {
    const latest = await this.blogModel.find().sort({ _id: -1 }).limit(1);
    return latest;
  }

  async getBlogById(id: String): Promise<Blog> {
    const blogId = await this.blogModel.findById(id);
    return blogId;
  }
  async updateBlog(id: String, blogDto: BlogDto): Promise<Blog> {
    const updateblog = await this.blogModel.findByIdAndUpdate(id, blogDto);
    return updateblog;
  }
  async deleteBlog(id: String): Promise<Blog> {
    const blogToDelete = await this.blogModel.findByIdAndDelete(id);
    return blogToDelete;
  }
  async introBlog(id: String): Promise<any> {
    const blog = await this.blogModel.findById(id);
    const intro = blog.Contenue.slice(0,250)+"...";
    return intro ;  
  }
  // async getLatestArticles(id :String): Promise<Blog> {
  //   const blog = await this.blogModel.findById(id)
  //   console.log(blog.Contenue);
    
  //   // const latestArticle = blog.Contenue.sort({_id:-1}).limit(1)
  //   return blog
  // }
  async logoCompanyPic(file, id) {
    return await this.blogModel.findOneAndUpdate({ _id: id }, { $set: { logo: file } }).exec();
}

}
