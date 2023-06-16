import * as ex from 'excalibur'
import {Item} from "../Core/Item.js";
import {Resources} from "../resources.js";

export class Nuclear extends Item{
    constructor(x, y) {
        super(x, y, Resources.Nuclear);
    }

    //Only executes when a player collides.
    Action(player) {

    }
}