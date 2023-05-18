import { ImageSource, Sound, Resource, Loader } from "excalibur";
import TargetIcon from './assets/finishedAssets/Target.png'
const Resources = {
    TargetIcon: new ImageSource(TargetIcon)
}
let loadables = [];
for(let resource in Resources){
    loadables.push(Resources[resource])
}
console.log(loadables)
let Loaded = true
const ResourceLoader = new Loader(loadables);

export { Resources, ResourceLoader, Loaded };