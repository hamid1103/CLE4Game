import * as ex from 'excalibur'
import {Item} from "../Core/Item.js";
import {Resources} from "../resources.js";

export class BlockDestroyer extends Item {
    constructor(x, y, Engine) {
        super(x, y, Resources.BreakPlatformItem, 'BlockDestroyer');
    }

    Action = (player) => {
        for(let bb in this.scene.viewableBBs){
            let curbb = this.scene.viewableBBs[bb]
            if(curbb === undefined)
                return
            curbb.kill()
        }

        player.heldItem = undefined
        //reset viewablesBBs
        this.scene.viewableBBs = []
    }

}