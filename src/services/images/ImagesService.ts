import * as constants from './ImagesService.constants';
import { delay } from 'src/utils/delay';

export class ImagesService {
    public async loadImageUrls(): Promise<string[]> {
        await delay(1000);
        return constants.URLS;
    }
}
