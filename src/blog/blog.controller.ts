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
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { blogService } from "./blog.service";
import { BlogDto } from "./dto/blog.dto";
import * as multer from "multer";
import * as path from "path";

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
  @Get("/latestBlogs")
  async getTheLatest() {
    const blogs = await this.blogService.getLatestBlog();
    return blogs;
  }
  @Get("/recentArticle")
  async latestArticle( ) {
    const blogs = await this.blogService.getLatestArticles();
   return blogs
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
  async deleteBlog(@Param("id") id: String, @Res() res) {
    const blogToDelete = await this.blogService.deleteBlog(id);
    return res.status(HttpStatus.OK).json({
      message: "blog deleted successuly",
      blog: blogToDelete,
    });
  }
  @UseInterceptors(FileInterceptor('image', {
    storage: multer.diskStorage({
      destination : (req,file,cb)=> {  
        cb(null, 'upload/');
      },
      filename:(req,file, cb)=> {
        cb(null, Date.now() + file.originalname.slice(file.originalname.lastIndexOf('.')));
      },
    }),
  }))
  @Put('/Blogs/file/:id')
async uploadLogoCompany(@Res() res, @UploadedFile() file, @Param('id') id): Promise<any> {
  if ((path.extname(`${file.filename}`) === '.png')||  (path.extname(`${file.filename}`) === '.jpg') || (path.extname(`${file.filename}`) === '.jpeg')) {
    this.blogService.logoCompanyPic(`${file.filename}`, id);
    await res.json(file);
  }
    return { message: 'not an Image' };
  }

  @Get("Blogs/:getimage")
  getFiles(@Param("getimage") getimage: String, @Res() res) {
    return res.sendFile(getimage, { root: "upload" });
  }
}
