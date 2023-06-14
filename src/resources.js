import { ImageSource, Sound, Resource, Loader, Sprite } from "excalibur";
import TargetIcon from './assets/finishedAssets/Target.png'
import pixelplatform from './assets/pixelplatform.png'




const Resources = {
    TargetIcon: new ImageSource(TargetIcon),
    Pixelplatform: new ImageSource(pixelplatform),
}

const SpriteResources = {
    PixelplatformSprite: Sprite.from(Resources.Pixelplatform)
}

let loadables = [];
for(let resource in Resources){
    loadables.push(Resources[resource])
}
console.log(loadables)
let Loaded = true
const ResourceLoader = new Loader(loadables);

export { Resources, ResourceLoader, Loaded, SpriteResources };