import React from 'react';
import { Popup } from '../popup';
import { GalleryVM, ImageSizes } from 'src/view-models/gallery';
import { observer } from 'mobx-react';
import styles from './Gallery.module.css';
import { LockFocusOutside } from '../lock-focus-outside';

type TProps = {
    vm: GalleryVM;
};

export const Gallery: React.VFC<TProps> = observer(({ vm }) => {
    if (!vm.clickedImage) return null;

    return (
        <Popup onClose={vm.handleClose}>
            <LockFocusOutside>
                <div className={styles.wrapper}>
                    <img
                        src={vm.clickedImage.imageUrl}
                        className={styles[vm.imageSize]}
                        alt=""
                    />
                    <div>
                        <button
                            onClick={() => {
                                vm.setImageSize(ImageSizes.FullScreen);
                            }}
                            disabled={vm.imageSize === ImageSizes.FullScreen}
                        >
                            Увеличить
                        </button>
                        <button
                            onClick={() => vm.setImageSize(ImageSizes.Default)}
                            disabled={vm.imageSize === ImageSizes.Default}
                        >
                            Уменьшить
                        </button>
                        <button onClick={vm.handleClose}>Закрыть</button>
                    </div>
                </div>
            </LockFocusOutside>
        </Popup>
    );
});
