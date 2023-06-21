import * as ex from 'excalibur'
import {Resources} from "../resources.js";
import {Vector} from "excalibur";
export class chunk extends ex.Actor {
    constructor(y, indx = 0) {
        super({
            width:Resources.BGChunk.width,
            height:Resources.BGChunk.height,
            scale: ex.vec(21.2, 21.5),
            pos: ex.vec(720, -5550 - y),
        });
        this.graphics.use(Resources.BGChunk.toSprite())
        this.cusY = y
        this.indx = indx
    }

    onInitialize(_engine) {
        if(this.indx !== 0){
            this.pos.y = this.cusY + (211 * 2.15)
        }
        this.indx++

        this.Seen = false
        this.on('enterviewport', (e)=>{
            this.Seen = true
            let newChunk = new chunk(this.collider.bounds.top, this.indx)
            this.scene.add(newChunk)
        })
        this.on('exitviewport', (e)=>{
            if(this.Seen === true){
                this.kill()
            }
        })
    }
    onPreUpdate(_engine, _delta) {
        this.transform.z = -1
    }

}