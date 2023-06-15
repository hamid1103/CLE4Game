import { Actor, Engine, Vector, Label, Color, Font, FontUnit,  TileMap, DisplayMode, FrameStats, GraphicsGroup} from "excalibur";
import { Resources, ResourceLoader } from "../resources";

export class ScrollingBackground extends Actor{

    offset

    constructor() {
        super()
        let scrollImage = Resources.Background.toSprite()
        // this.scale = new Vector(5, 5);
        this.anchor = new Vector(0, 0)
        this.offset = scrollImage.height

        

        const group = new GraphicsGroup({
            members: [
                {
                    graphic: scrollImage,
                    pos: new Vector(0, 0)
                },
                {
                    graphic: scrollImage,
                    pos: new Vector(0, scrollImage.height)
                }
            ]
        })

        this.graphics.add(group)
        this.pos = new Vector(0, 0)
        this.vel = new Vector(0, -100)
    }

    onPostUpdate() {
        if (this.pos.y < -this.offset) {
            this.pos = new Vector(0, 0)
        }
    }
}