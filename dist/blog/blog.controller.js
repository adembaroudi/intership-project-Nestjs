"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const blog_service_1 = require("./blog.service");
const blog_dto_1 = require("./dto/blog.dto");
const multer = require("multer");
const path = require("path");
let blogController = class blogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    async addUser(res, blogDto) {
        const blog = await this.blogService.addBlog(blogDto);
        return res.status(common_1.HttpStatus.OK).json({
            message: "blog added successuly",
            blog: blog,
        });
    }
    async getAllBlogs(res) {
        const blogs = await this.blogService.getAllBlogs();
        return res.send(blogs);
    }
    async getBlogById(id, res) {
        const blogId = await this.blogService.getBlogById(id);
        return res.send(blogId);
    }
    async getTheLatest() {
        const blogs = await this.blogService.getLatestBlog();
        return blogs;
    }
    async latestArticle() {
        const blogs = await this.blogService.getLatestArticles();
        return blogs;
    }
    async introBlogs(id) {
        const intro = await this.blogService.introBlog(id);
        return intro;
    }
    async updateBlog(id, res, blogDto) {
        const updateblog = await this.blogService.updateBlog(id, blogDto);
        return res.send(updateblog);
    }
    async deleteBlog(id, res) {
        const blogToDelete = await this.blogService.deleteBlog(id);
        return res.status(common_1.HttpStatus.OK).json({
            message: "blog deleted successuly",
            blog: blogToDelete,
        });
    }
    async uploadLogoCompany(res, file, id) {
        if ((path.extname(`${file.filename}`) === '.png') || (path.extname(`${file.filename}`) === '.jpg') || (path.extname(`${file.filename}`) === '.jpeg')) {
            this.blogService.logoCompanyPic(`${file.filename}`, id);
            await res.json(file);
        }
        return { message: 'not an Image' };
    }
    getFiles(getimage, res) {
        return res.sendFile(getimage, { root: "upload" });
    }
};
__decorate([
    common_1.Post("/Blogs"),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, blog_dto_1.BlogDto]),
    __metadata("design:returntype", Promise)
], blogController.prototype, "addUser", null);
__decorate([
    common_1.Get("/Blogs"),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], blogController.prototype, "getAllBlogs", null);
__decorate([
    common_1.Get("/Blogs/:id"),
    __param(0, common_1.Param("id")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], blogController.prototype, "getBlogById", null);
__decorate([
    common_1.Get("/latestBlogs"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], blogController.prototype, "getTheLatest", null);
__decorate([
    common_1.Get("/recentArticle"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], blogController.prototype, "latestArticle", null);
__decorate([
    common_1.Get("Blogs/intro/:id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], blogController.prototype, "introBlogs", null);
__decorate([
    common_1.Put("/Blogs/:id"),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Res()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, blog_dto_1.BlogDto]),
    __metadata("design:returntype", Promise)
], blogController.prototype, "updateBlog", null);
__decorate([
    common_1.Delete("/Blogs/:id"),
    __param(0, common_1.Param("id")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], blogController.prototype, "deleteBlog", null);
__decorate([
    common_1.UseInterceptors(platform_express_1.FileInterceptor('image', {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'upload/');
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + file.originalname.slice(file.originalname.lastIndexOf('.')));
            },
        }),
    })),
    common_1.Put('/Blogs/file/:id'),
    __param(0, common_1.Res()), __param(1, common_1.UploadedFile()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], blogController.prototype, "uploadLogoCompany", null);
__decorate([
    common_1.Get("Blogs/:getimage"),
    __param(0, common_1.Param("getimage")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], blogController.prototype, "getFiles", null);
blogController = __decorate([
    common_1.Controller("blog"),
    __metadata("design:paramtypes", [blog_service_1.blogService])
], blogController);
exports.blogController = blogController;
//# sourceMappingURL=blog.controller.js.map