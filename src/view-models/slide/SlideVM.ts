import { SlideModel } from 'src/models/slide';
import { ID } from 'src/types';

export class SlideVM {
    public constructor(private readonly model: SlideModel) {}

    public get id(): ID {
        return this.model.id;
    }

    public get imageUrl(): string {
        return this.model.imageUrl;
    }

    public get position(): number {
        return this.model.position;
    }
}
