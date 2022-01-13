import { generateId } from 'src/utils/generate-id';

export class SlideModel {
    public readonly id = generateId();
    public position: number;
    public imageUrl: string;

    public constructor(position: number, imageUrl: string) {
        this.position = position;
        this.imageUrl = imageUrl;
    }
}
