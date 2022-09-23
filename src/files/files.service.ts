import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const fileName = uuid() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      console.log('writing file on dist.....................,', file.buffer);

      return fileName;
    } catch (err) {
      throw new HttpException(
        'Error happened while file has been recorded',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
