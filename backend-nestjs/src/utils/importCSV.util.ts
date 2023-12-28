import { Injectable, NotFoundException } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import { promises as fs } from 'fs';

@Injectable()
export class ImportCSV {
  async uploadFile(file: any) {
    try {
      if (file) {
        const fileContent = await fs.readFile(file.path, 'utf-8'); // Đọc nội dung của tệp qua đường dẫn
        const records = parse(fileContent, {
          delimiter: ';', // Sử dụng dấu chấm phẩy làm dấu phân cách
          columns: (header) => header.map((column: string) => column.trim()),
          skip_empty_lines: true,
        });
        return records;
      }
    } catch (error) {
      throw new NotFoundException('Import tệp tin thất bại');
    }
  }
}
