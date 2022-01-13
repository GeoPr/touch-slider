import { AppVM } from '../app';
import { SlideVM } from '../slide';
import * as mobx from 'mobx';

export enum ImageSizes {
    Default = 'default',
    FullScreen = 'full',
}

export class GalleryVM {
    public imageSize: ImageSizes = ImageSizes.Default;

    public constructor(private readonly appVM: AppVM) {
        mobx.makeObservable(this, {
            imageSize: mobx.observable,
            setImageSize: mobx.action,
        });
    }

    public setImageSize(size: ImageSizes): void {
        this.imageSize = size;
    }

    public handleClose = () => {
        this.appVM.closeGallery();
    };

    public get clickedImage(): SlideVM | null {
        return this.appVM.clickedImage;
    }
}
