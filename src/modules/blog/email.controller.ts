import { Controller, Req, Get } from '@nestjs/common';
import { Request } from 'express';
import { BlogService } from './blog.service';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(
        private readonly blogService: BlogService,
        private readonly emailService: EmailService) { }
    /**
     * Route : /blog/getall
     * Usage : Get all articles
     * Description : shows article list
     */
    @Get('/contact')
    async getArticles(@Req() req: Request) {
        let data = {
            from: "91wheelsservicealert@gmail.com",
            to: "anela.kumar@gmail.com,ratidigital.in@gmail.com",
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        }
        const resp = await this.emailService.send(data);
        return resp;
    }
}
