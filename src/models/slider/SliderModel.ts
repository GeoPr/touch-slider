import { SlideModel } from '../slide';
import * as mobx from 'mobx';

export class SliderModel {
    public slides: SlideModel[];

    public static createEmpty(): SliderModel {
        return new SliderModel([]);
    }

    private constructor(slides: SlideModel[]) {
        this.slides = slides;

        mobx.makeObservable(this, {
            slides: mobx.observable,
            setSlides: mobx.action,
        });
    }

    public setSlides(slides: SlideModel[]): void {
        this.slides = slides;
    }
}
