import { Controller, Req, Get } from '@nestjs/common';
import { Request } from 'express';
import { BlogService } from './blog.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly blogService: BlogService) {}
  /**
   * Route : /blog/getall
   * Usage : Get all articles
   * Description : shows article list
   */
  @Get('')
  async getArticles(@Req() req: Request): Promise<Record<string, []>> {
    return await this.blogService.getAllArticles(req.query);
  }
}
