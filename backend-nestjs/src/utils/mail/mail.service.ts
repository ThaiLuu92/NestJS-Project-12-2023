import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import 'dotenv/config';

@Injectable()
export class EmailService {
  private transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendMail(to: string, subject: string, html: string, bufferPDF?: Buffer) {
    const config = {};
    if (bufferPDF) {
      (config as any).attachments = [
        {
          filename: 'certificate.pdf',
          content: bufferPDF,
          contentType: 'application/pdf',
        },
      ];
    }
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to,
      subject,
      html,
      ...config,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
