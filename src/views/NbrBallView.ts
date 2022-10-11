import { BaseView } from './BaseView';
import * as PIXI from 'pixi.js';
import { GameApplication } from '../GameApplication';
import { EventDispatcher } from '../EventDispatcher';
import { GameEvents } from '../GameEvents';
import { BrickType } from '../game/level/BrickType';

export class NbrBallView extends BaseView {

    private label: PIXI.Text;
    private nbrBallText: PIXI.Text;

    constructor() {
        super();
    }

    public setNbrBall(ball: number) {
        this.nbrBallText.text = ball.toString(10).padStart(2, "0");
    }

    protected init() {
        super.init();

        this.label = new PIXI.Text("BALL:");
        this.label.resolution = 2;
        this.label.style = new PIXI.TextStyle({
            fill: 0xffffff,
            fontSize: 45,
            fontFamily: "Minecraft",
            align: "left"
        });

        this.label.x = GameApplication.STAGE_WIDTH * 0.03;
        this.label.y = GameApplication.STAGE_HEIGHT * 0.9;

        this.nbrBallText = new PIXI.Text("03");
        this.nbrBallText.resolution = 2;
        this.nbrBallText.style = new PIXI.TextStyle({
            fill: 0xffffff,
            fontSize: 45,
            fontFamily: "Minecraft",
            align: "left"
        });

        this.nbrBallText.x = GameApplication.STAGE_WIDTH * 0.2;
        this.nbrBallText.y = GameApplication.STAGE_HEIGHT * 0.9;

        this.addChild(this.label);
        this.addChild(this.nbrBallText);
    }
}