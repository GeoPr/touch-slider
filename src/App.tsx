import React from 'react';
import { useConst } from './hooks';
import { AppVM } from './view-models/app';
import { SliderVM } from './view-models/slider';
import { SliderModel } from './models/slider';
import { SliderController } from './components/slider';
import { ImagesService } from './services/images';
import { observer } from 'mobx-react';
import { Gallery } from './components/gallery';
import { GalleryVM } from './view-models/gallery';

const App: React.VFC = observer(() => {
    const vm = useConst(() => {
        return new AppVM(
            new SliderVM(SliderModel.createEmpty(), new ImagesService()),
            GalleryVM,
        );
    });

    return (
        <>
            <SliderController vm={vm.sliderVM} />
            {vm.galleryVM && <Gallery vm={vm.galleryVM} />}
        </>
    );
});

export default App;
