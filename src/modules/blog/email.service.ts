/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { HelperService } from 'src//common/providers';
var nodeMailer = require('nodemailer');

@Injectable()
export class EmailService {
    mailer: any;
    constructor(
        private readonly sequelize: Sequelize,
        private readonly helper: HelperService,
    ) {
        try {
            this.mailer = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SMTP_EMAIL,
                    pass: process.env.SMTP_PASS
                }
            });
        }
        //try block ends here
        catch (e) {
            console.log(e);
        }
    }
    //send email function
    async send(data: {}): Promise<any> {
        return await this.mailer.sendMail(data);
    }

}



