import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { certificateTemplate } from './certificate.template';

@Injectable()
export class ExportPDFService {
  async generatePdf(data = '') {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const margins = {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm',
    };

    await page.setContent(data);
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: margins
    });
    await browser.close();

    return pdfBuffer;
  }

  ertificateContentPDF(name: string, course_name: string) {
    return certificateTemplate(name, course_name);
  }
}
