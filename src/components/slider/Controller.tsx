import React from 'react';
import { SliderView } from './SliderView';
import { SliderVM } from 'src/view-models/slider';
import { observer } from 'mobx-react';
import { LinkedListNode } from 'src/utils/linked-list';
import { SlideVM } from 'src/view-models/slide';

export type TSliderEvent = {
    event: React.PointerEvent;
    slide: LinkedListNode<SlideVM>;
};

type TProps = {
    vm: SliderVM;
};

export const SliderController: React.VFC<TProps> = observer(({ vm }) => {
    const handlePointerDown = React.useCallback(
        ({ event, slide }: TSliderEvent) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            vm.handleDown(event.clientX, slide.element);
        },
        [vm],
    );

    const handlePointerMove = React.useCallback(
        ({ event, slide }: TSliderEvent) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            vm.handleMove(event.clientX, slide);
        },
        [vm],
    );

    const handleCancelMove = React.useCallback(
        (e: React.PointerEvent) => {
            e.currentTarget.releasePointerCapture(e.pointerId);
            vm.handleCancelMove();
        },
        [vm],
    );

    const handlePointerUp = React.useCallback(
        ({ event, slide }: TSliderEvent) => {
            if (vm.canHandleClick) {
                vm.setClickedSlide(slide.element);
                return;
            }

            handleCancelMove(event);
        },
        [handleCancelMove, vm],
    );

    React.useEffect(() => {
        vm.loadSlides();
    }, [vm]);

    const style: React.CSSProperties = React.useMemo(
        () => ({
            transform: `translateX(${vm.trackOffset}%)`,
            transition: vm.shouldMoveToNextSlide ? 'transform 0.3s' : '',
        }),
        [vm.shouldMoveToNextSlide, vm.trackOffset],
    );

    if (vm.isLoading) {
        return <div>loading...</div>;
    }

    return (
        <SliderView
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onCancelMove={handleCancelMove}
            onPointerUp={handlePointerUp}
            slides={vm.slides}
            setTrackNode={vm.setTrackNode}
            style={style}
        />
    );
});
