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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let blogService = class blogService {
    constructor(blogModel) {
        this.blogModel = blogModel;
        this.blog = [];
    }
    async addBlog(blogDto) {
        const newBlog = await new this.blogModel(blogDto);
        return newBlog.save();
    }
    async getAllBlogs() {
        const allBlogs = await this.blogModel.find();
        return allBlogs;
    }
    async getLatestBlog() {
        const latest = await this.blogModel.find().sort({ _id: -1 }).limit(1);
        return latest;
    }
    async getBlogById(id) {
        const blogId = await this.blogModel.findById(id);
        return blogId;
    }
    async updateBlog(id, blogDto) {
        const updateblog = await this.blogModel.findByIdAndUpdate(id, blogDto);
        return updateblog;
    }
    async deleteBlog(id) {
        const blogToDelete = await this.blogModel.findByIdAndDelete(id);
        return blogToDelete;
    }
    async introBlog(id) {
        const blog = await this.blogModel.findById(id);
        const intro = blog.Contenue.slice(0, 250) + "...";
        return intro;
    }
    async logoCompanyPic(file, id) {
        return await this.blogModel.findOneAndUpdate({ _id: id }, { $set: { logo: file } }).exec();
    }
};
blogService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("blog")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], blogService);
exports.blogService = blogService;
//# sourceMappingURL=blog.service.js.map