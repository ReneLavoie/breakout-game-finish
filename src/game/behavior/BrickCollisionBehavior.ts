import { GameObjectBehavior } from './GameObjectBehavior';
import { GameObject } from '../GameObject';
import { EventDispatcher } from '../../EventDispatcher';
import { GameEvents } from '../../GameEvents';
import * as PIXI from 'pixi.js';

export class BrickCollisionBehavior extends GameObjectBehavior {

    private ballRef: GameObject;
    private brickType: string;
    private totalNbrHit: number = 0;
    private isActive: boolean = false;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    public setBrickType(type: string) {
        this.brickType = type;
    }

    public update(deltaTime: number) {

        if(!this.isActive) {
            return;
        }

        if(this.checkBallCollision()) {
            this.wasHit();
        }
    }

    public destroy() {
        this.ballRef = null;
        EventDispatcher.getInstance().getDispatcher().off(GameEvents.BALL_ACTIVE, this.activate, this);
    }

    protected init() {
        super.init();

        this.ballRef = this.gameObjRef.getGameViewRef().getGameObjectById("ball") as GameObject;

        EventDispatcher.getInstance().getDispatcher().on(GameEvents.BALL_ACTIVE, this.activate, this);
    }

    private activate() {
        this.isActive = true;
    }

    private checkBallCollision(): boolean {
        
        const ballRect: PIXI.Rectangle = new PIXI.Rectangle(this.ballRef.x - this.ballRef.width * 0.5, this.ballRef.y - this.ballRef.width * 0.5, this.ballRef.width, this.ballRef.height);
        const brickRect: PIXI.Rectangle = new PIXI.Rectangle(this.gameObjRef.x, this.gameObjRef.y, this.gameObjRef.width, this.gameObjRef.height);

        return (ballRect.left <= brickRect.right &&
            brickRect.left <= ballRect.right &&
            ballRect.top <= brickRect.bottom &&
            brickRect.top <= ballRect.bottom);
    }

    private wasHit() {
        this.totalNbrHit++;
        EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIT, {objId: this.gameObjRef.getId(), brickType: this.brickType, nbrHit: this.totalNbrHit});

        this.isActive = false;

        setTimeout(() => {
            this.isActive = true;
        }, 500);
    }
}