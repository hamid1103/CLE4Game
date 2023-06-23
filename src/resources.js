import { ImageSource, Sound, Resource, Loader, Sprite } from "excalibur";
import TargetIcon from './assets/finishedAssets/Target.png'
import TargetIcon2 from './assets/finishedAssets/Target2.png'
import pixelplatform from './assets/finishedAssets/platform.png'
import background from './assets/finishedAssets/background_start.png'
import duif from './assets/finishedAssets/duif.png'
import kwal from './assets/finishedAssets/jellyfish.png'
import jetpack from './assets/finishedAssets/jetpack.png'
import nuclear from './assets/finishedAssets/nuclear.png'
import rocket from './assets/finishedAssets/rocket.png'
import star from './assets/finishedAssets/star.png'
import health from './assets/finishedAssets/health.png'
import projectile from './assets/finishedAssets/projectile.png'
import coin from './assets/finishedAssets/coin.png'
import BGChunk from './assets/finishedAssets/background_chunk.png'
import ElecPlatSprite from './assets/finishedAssets/ElectricPlatform.png'

const Resources = {
    TargetIcon: new ImageSource(TargetIcon),
    TargetIcon2: new ImageSource(TargetIcon2),
    Pixelplatform: new ImageSource(pixelplatform),
    Background: new ImageSource(background),
    Enemy1: new ImageSource(kwal),
    Enemy2: new ImageSource(duif),
    Jetpack: new ImageSource(jetpack),
    Nuclear: new ImageSource(nuclear),
    Rocket: new ImageSource(rocket),
    Star: new ImageSource(star),
    Health: new ImageSource(health),
    Projectile: new ImageSource(projectile),
    Coin: new ImageSource(coin),
    BGChunk: new ImageSource(BGChunk),
    ElecPlatSprite: new ImageSource(ElecPlatSprite)
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