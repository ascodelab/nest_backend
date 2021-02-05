import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { EmailController } from './email.controller';
import { BlogService } from './blog.service';
import { EmailService } from './email.service';
@Module({
  imports: [],
  controllers: [ArticleController, EmailController],
  providers: [BlogService, EmailService],
})
export class BlogModule { }
