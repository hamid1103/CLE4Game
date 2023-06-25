import * as ex from 'excalibur'
import {Item} from "../Core/Item.js";
import {Resources} from "../resources.js";
import {Actor} from "excalibur";
import {ShowJetPack} from "../Entities/ShowJetPack.js";
export class Jetpack extends Item{
    constructor(x, y, Engine) {
        super(x, y, Resources.Jetpack, 'JetPack');
    }
    Action = (player)=> {
        player.setJetPacking(true)
        player.heldItem = undefined
        let ShowJP = new ShowJetPack(player)
        player.scene.add(ShowJP)
        setTimeout(()=>{
            player.setJetPacking(false)
            ShowJP.kill()
        }, 1500)
    }

}