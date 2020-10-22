import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { blogService } from "./blog.service";
import { BlogDto } from "./dto/blog.dto";

@Controller("blog")
export class blogController {
  constructor(private blogService: blogService) {}

  @Post("/Blogs")
  async addUser(@Res() res, @Body() blogDto: BlogDto) {
    const blog = await this.blogService.addBlog(blogDto);
    return res.status(HttpStatus.OK).json({
      message: "blog added successuly",
      blog: blog,
    });
  }
  @Get("/Blogs")
  async getAllBlogs(@Res() res) {
    const blogs = await this.blogService.getAllBlogs();
    return res.send(blogs);
  }
  @Get("/Blogs/:id")
  async getBlogById(@Param("id") id: string, @Res() res) {
    const blogId = await this.blogService.getBlogById(id);
    return res.send(blogId);
  }
  @Get("/Blogs/latest")
  async getTheLatest(@Res() res) {
    const blogs = await this.blogService.getLatestBlog();
    return res.send(blogs);
  }
  @Get("/Blogs/latestArticles/:id")
  async latestArticle(@Param('id')id:String, @Res() res) {
    const blogs = await this.blogService.getLatestArticles(id);
    return blogs;
  }
  @Get("Blogs/intro/:id")
  async introBlogs(@Param("id") id: String) {
    const intro = await this.blogService.introBlog(id);
    return intro;
  }
  @Put("/Blogs/:id")
  async updateBlog(
    @Param("id") id: string,
    @Res() res,
    @Body() blogDto: BlogDto
  ) {
    const updateblog = await this.blogService.updateBlog(id, blogDto);
    return res.send(updateblog);
  }
  @Delete("/Blogs/:id")
  async deleteUser(@Param("id") id: String, @Res() res) {
    const blogToDelete = await this.blogService.deleteBlog(id);
    return res.status(HttpStatus.OK).json({
      message: "blog deleted successuly",
      blog: blogToDelete,
    });
  }
}
