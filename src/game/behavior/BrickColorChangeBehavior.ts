import { GameObjectBehavior } from './GameObjectBehavior';
import { GameObject } from '../GameObject';
import { EventDispatcher } from '../../EventDispatcher';
import { GameEvents } from '../../GameEvents';
import * as PIXI from 'pixi.js';

export class BrickColorChangeBehavior extends GameObjectBehavior {

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    public destroy() {
        EventDispatcher.getInstance().getDispatcher().off(GameEvents.BRICK_HIT, this.onBrickHit, this);
    }

    protected init() {
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.BRICK_HIT, this.onBrickHit, this);
    }

    private onBrickHit(e: any) {
        if(e.objId !== this.gameObjRef.getId()) {
            return;
        }

        const texture: PIXI.Sprite =  this.gameObjRef.getRenderableById("brickImg") as PIXI.Sprite;

        if(!texture) {
            return;
        }

        switch(e.nbrHit) {
            case 1:
                texture.tint = 0x0000ff;
                break;
            case 2:
                texture.tint = 0x00ff00;
                break;
        }
    }
}