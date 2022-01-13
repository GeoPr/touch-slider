import { SliderModel } from 'src/models/slider';
import * as mobx from 'mobx';
import { LinkedList, LinkedListNode } from 'src/utils/linked-list';
import { SlideVM } from '../slide';
import * as constants from './SliderVM.constants';
import { ImagesService } from '../../services/images';
import { SlideModel } from '../../models/slide';

type TSlides = LinkedListNode<SlideVM>[];

export class SliderVM {
    private readonly linkedList = new LinkedList<SlideVM>();
    private trackNode: HTMLDivElement | null = null;
    private initialPosition: number | null = null;
    private initialSlide: SlideVM | null = null;
    public clickedSlide: SlideVM | null = null;
    public trackOffset = 0;
    public shouldMoveToNextSlide = false;
    public canHandleClick = true;
    public isLoading = false;

    public constructor(
        private readonly model: SliderModel,
        private readonly imagesService: ImagesService,
    ) {
        mobx.makeObservable(this, {
            isLoading: mobx.observable,
            trackOffset: mobx.observable,
            clickedSlide: mobx.observable,
            shouldMoveToNextSlide: mobx.observable,
            handleMove: mobx.action,
            handleCancelMove: mobx.action,
            setClickedSlide: mobx.action,
            loadSlides: mobx.action,
            setCanHandleClick: mobx.action,
            slides: mobx.computed,
            canHandleClick: mobx.observable,
        });
    }

    public get slides(): TSlides {
        this.linkedList.clear();

        this.model.slides.forEach((slide) => {
            this.linkedList.append(new SlideVM(slide));
        });

        return this.linkedList.toArray();
    }

    public async loadSlides(): Promise<void> {
        try {
            this.isLoading = true;

            const urls = await this.imagesService.loadImageUrls();
            const slideModels = urls.map(
                (url, index) => new SlideModel(index / 10, url),
            );
            this.model.setSlides(slideModels);
        } finally {
            mobx.runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    public setCanHandleClick(canHandle: boolean): void {
        this.canHandleClick = canHandle;
    }

    public setTrackNode = (node: HTMLDivElement): void => {
        this.trackNode = node;
    };

    public setClickedSlide = (slideVM: SlideVM | null): void => {
        this.clickedSlide = slideVM;
    };

    public setInitialSlide(slide: SlideVM | null): void {
        this.initialSlide = slide;
    }

    public setInitialPosition(position: number | null): void {
        if (!this.trackNode) return;

        this.initialPosition =
            position === null
                ? position
                : position / this.trackNode.scrollWidth;
    }

    public handleDown(position: number, slide: SlideVM): void {
        this.setInitialPosition(position);
        this.setInitialSlide(slide);
        this.setCanHandleClick(true);
    }

    public handleMove(position: number, slide: LinkedListNode<SlideVM>): void {
        if (this.initialPosition === null || !this.trackNode) return;

        this.setCanHandleClick(false);

        const percentPosition = position / this.trackNode.scrollWidth;
        const positionsDiff = this.initialPosition - percentPosition;
        const diffPercent = positionsDiff * 100;
        const slidePosition = slide.element.position * 1000;
        const percentWithCurrentSlidePosition = diffPercent + slidePosition;

        this.trackOffset = -percentWithCurrentSlidePosition;
        this.shouldMoveToNextSlide =
            Math.abs(diffPercent) >= constants.MIN_PERCENT_DISTANCE;

        if (this.shouldMoveToNextSlide) {
            const moveTo = positionsDiff > 0 ? 'next' : 'prev';
            const slideToMove = slide[moveTo]?.element;
            const slideToMovePosition = slideToMove?.position ?? 0;
            const percentSlidePosition = slideToMovePosition * 1000;
            this.trackOffset = -percentSlidePosition;
        }
    }

    public handleCancelMove(): void {
        if (!this.shouldMoveToNextSlide && this.initialSlide) {
            this.shouldMoveToNextSlide = true;
            this.trackOffset = -this.initialSlide.position * 1000;
        }

        this.initialSlide = null;
        this.initialPosition = null;
    }
}
