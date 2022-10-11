import { GameObjectBehavior } from './GameObjectBehavior';
import { GameObject } from '../GameObject';
import { EventDispatcher } from '../../EventDispatcher';
import { GameEvents } from '../../GameEvents';
import { BrickType } from '../level/BrickType';
export class BrickHideBehavior extends GameObjectBehavior {

    private brickType: string;
    private disable: boolean = false;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    public setBrickType(type: string) {
        this.brickType = type;
    }

    public destroy() {
        EventDispatcher.getInstance().getDispatcher().off(GameEvents.BRICK_HIT, this.onBrickHit, this);
    }

    protected init() {
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.BRICK_HIT, this.onBrickHit, this);
    }

    private onBrickHit(e: any) {

        if(this.disable) {
            return;
        }

        if(e.objId !== this.gameObjRef.getId()) {
            this.disable = true;
            setTimeout(() => this.disable = false, 500);
            return;
        }

        switch(e.brickType) {
            case BrickType.TYPE_1:
            case BrickType.TYPE_3:
                if(e.nbrHit >= 1) {
                    EventDispatcher.getInstance().getDispatcher().off(GameEvents.BRICK_HIT, this.onBrickHit, this);
                    EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIDE, {objId: this.gameObjRef.getId(), brickType: this.brickType});
                }
                break;
            case BrickType.TYPE_2:
                if(e.nbrHit >= 3) {
                    EventDispatcher.getInstance().getDispatcher().off(GameEvents.BRICK_HIT, this.onBrickHit, this);
                    EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIDE, {objId: this.gameObjRef.getId(), brickType: this.brickType});
                }
                break;
        }
    }
}