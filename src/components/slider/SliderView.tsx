import React from 'react';
import styles from './SliderView.module.css';
import { LinkedListNode } from 'src/utils/linked-list';
import { SlideVM } from 'src/view-models/slide';
import { TSliderEvent } from './Controller';

type TProps = {
    slides: LinkedListNode<SlideVM>[];
    style?: React.CSSProperties;
    setTrackNode(node: HTMLDivElement): void;
    onPointerDown(e: TSliderEvent): void;
    onPointerMove(e: TSliderEvent): void;
    onCancelMove(e: React.PointerEvent): void;
    onPointerUp(e: TSliderEvent): void;
};

export const SliderView: React.VFC<TProps> = React.memo(
    ({
        setTrackNode,
        slides,
        onPointerDown,
        onCancelMove,
        onPointerMove,
        onPointerUp,
        style,
    }) => (
        <div className={styles.wrapper}>
            <div className={styles.track} ref={setTrackNode} style={style}>
                {slides.map((slide) => (
                    <div
                        className={styles.slide}
                        key={slide.element.id}
                        onPointerDown={(event) =>
                            onPointerDown({ event, slide })
                        }
                        onPointerMove={(event) =>
                            onPointerMove({ event, slide })
                        }
                        onPointerUp={(event) => onPointerUp({ event, slide })}
                        onPointerCancel={onCancelMove}
                        onPointerLeave={onCancelMove}
                    >
                        <img
                            src={slide.element.imageUrl}
                            className={styles.img}
                            alt=""
                        />
                    </div>
                ))}
            </div>
        </div>
    ),
);
