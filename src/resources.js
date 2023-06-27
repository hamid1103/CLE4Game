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
import BreakablePlatformTexture from './assets/finishedAssets/Breakable_platform.png'
import ElecPlatSprite from './assets/finishedAssets/ElectricPlatform.png'
import startbutton from './assets/finishedAssets/Start.png'
import BreakPlatformItem from './assets/finishedAssets/BreakPlatformItem.png'
import luckyblock from './assets/finishedAssets/luckyblock.png'
import titleImage from './assets/finishedAssets/Startscreen.png'
import electriceffect from './assets/finishedAssets/ElectricEffect.png'

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
    ElecPlatSprite: new ImageSource(ElecPlatSprite),
    BreakablePlatformTexture: new ImageSource(BreakablePlatformTexture),
    Startbutton: new ImageSource(startbutton),
    BreakPlatformItem: new ImageSource(BreakPlatformItem),
    LuckyBlock: new ImageSource(luckyblock),
    ElectricEffect :new ImageSource(electriceffect)
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

ResourceLoader.logo = titleImage
ResourceLoader.logoWidth = 800; 
ResourceLoader.logoHeight = 300;


ResourceLoader.startButtonFactory = () => {
    let btn = document.createElement('button');
    btn.classList.add("my-own-cool-button");
    btn.style.width = "700px";
    btn.style.height = "100px";
    btn.textContent = "Druk op Enter";
    btn.style.backgroundColor = "blue";
    btn.style.border = "none";
    btn.style.color = "white";
    btn.style.padding = "10px 20px";
    btn.style.textAlign = "center";
    btn.style.textDecoration = "none";
    btn.style.display = "inline-block";
    btn.style.fontSize = "50px";
    btn.style.margin = "10px";
    btn.style.borderRadius = "40% 10%";
    btn.style.boxShadow = "2px 2px 5px black";
    btn.style.cursor = "pointer"
    
    btn.addEventListener("click", () => {
        console.log("Button geklikt!");
    });
    return btn
}