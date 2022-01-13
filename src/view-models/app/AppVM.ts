import { SliderVM } from '../slider';
import { SlideVM } from '../slide';
import * as mobx from 'mobx';
import { TInferConstructor } from '../../types/InferConstructor';
import { GalleryVM } from 'src/view-models/gallery';

export class AppVM {
    public galleryVM: GalleryVM | null = null;

    public constructor(
        public readonly sliderVM: SliderVM,
        private readonly Gallery: TInferConstructor<
            GalleryVM,
            typeof GalleryVM
        >,
    ) {
        mobx.makeObservable(this, {
            galleryVM: mobx.observable,
            openGallery: mobx.action,
            closeGallery: mobx.action,
        });

        mobx.autorun(() => {
            this.clickedImage ? this.openGallery() : this.closeGallery();
        });

        mobx.autorun(() => {
            if (!this.galleryVM) {
                this.sliderVM.setClickedSlide(null);
            }
        });
    }

    public get clickedImage(): SlideVM | null {
        return this.sliderVM.clickedSlide;
    }

    public openGallery(): void {
        this.galleryVM = new this.Gallery(this);
    }

    public closeGallery(): void {
        this.galleryVM = null;
    }
}
