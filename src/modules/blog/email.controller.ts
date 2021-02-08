import { Controller, Req, Get, Post } from '@nestjs/common';
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
    @Post('/contact')
    async getArticles(@Req() req: Request) {

        const name = req.body.name || 'Anil Sharma';
        const subject = req.body.subject || `Hello ✔ from ${req.body.name}`;
        const email = req.body.email || 'anela.kumar@gmail.com';
        const phone = req.body.phone || '+91 8860327209';
        const message = req.body.phone || 'HoLLa!!';

        let data = {
            from: `${name} <${email}>`,
            to: "anela.kumar@gmail.com,ratidigital.in@gmail.com",
            subject: `Hello ✔ from : ${name}`,
            text: `${message}`,
            html: this.getHtml(name, subject, email, phone, message),
        }
        const resp = await this.emailService.send(data);
        return resp;
    }
    //function get html
    getHtml(name: any, subject: any, email: any, phone: any, message: any) {
        const content =
            `<!DOCTYPE html>
            <html>
            <head>
            <style>
            table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
            }
            td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            }
            tr:nth-child(even) {
            background-color: #dddddd;
            }
            </style>
            </head>
            <body>
            <p><i>${subject}</i></p>
            </hr>
            <h2>Basic Information</h2>
            <table>
            <tr>
                <th>Identifiers</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>Name</td>
                <td>${name}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>${email}</td>
            </tr>
            <tr>
                <td>Phone</td>
                <td>${phone}</td>
            </tr>
            </table>
            </hr>
            <h2>Message:</h2>
            <p><i>${message}</i></p>
            </body>
            </html>
            `;
        return content;
    }
}
