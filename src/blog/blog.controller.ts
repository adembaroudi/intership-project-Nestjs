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
import { FileInterceptor } from "@nestjs/platform-express";
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
  @Get("/Blogs/:idblog")
  async getBlogById(@Param("idblog") idblog: string, @Res() res) {
    const blogId = await this.blogService.getBlogById(idblog);
    return res.send(blogId);
  }
  @Get("/latestBlogs")
  async getTheLatest() {
    const blogs = await this.blogService.getLatestBlog();
    return blogs;
  }
  @Get("/recentArticle")
  async latestArticle() {
    const blogs = await this.blogService.getLatestArticles();
    return blogs;
  }
  @Get("Blogs/intro/:idblog")
  async introBlogs(@Param("idblog") idblog: String, @Res() res) {
    const intro = await this.blogService.introBlog(idblog);
    return res.status(HttpStatus.OK).json({
      intro: intro,
    });
  }
  @Put("/Blogs/:idblog")
  async updateBlog(
    @Param("idblog") idblog: string,
    @Res() res,
    @Body() blogDto: BlogDto
  ) {
    const updateblog = await this.blogService.updateBlog(idblog, blogDto);
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
  @UseInterceptors(
    FileInterceptor("image", {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "upload/");
        },
        filename: (req, file, cb) => {
          cb(
            null,
            Date.now() +
              file.originalname.slice(file.originalname.lastIndexOf("."))
          );
        },
      }),
    }) 
  )
  @Put("/Blogs/file/:idblog")
  async uploadLogoCompany(
    @Res() res,
    @UploadedFile() file,
    @Param("idblog") idblog
  ): Promise<any> {
    if (
      path.extname(`${file.filename}`) === ".png" ||
      path.extname(`${file.filename}`) === ".jpg" ||
      path.extname(`${file.filename}`) === ".JPG"||
      path.extname(`${file.filename}`) === ".jpeg"
    ) {
      this.blogService.logoCompanyPic(`${file.filename}`, idblog);
      await res.json(file.path);
    }
    return { message: "not an Image" };
  }

  @Get("getBlogsLogo/:idblog")
  async getFiles(@Param("idblog") idblog: String, @Res() res) {
    const getlogo = await this.blogService.getLogo(idblog);
    return res.sendFile(getlogo, { root: "upload" });
  }
}
 