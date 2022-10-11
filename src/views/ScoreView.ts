import { BaseView } from './BaseView';
import * as PIXI from 'pixi.js';
import { GameApplication } from '../GameApplication';
import { GameEvents } from '../GameEvents';
import { EventDispatcher } from '../EventDispatcher';
import { BrickType } from '../game/level/BrickType';

export class ScoreView extends BaseView {

    private scoreText: PIXI.Text;
    private label: PIXI.Text;

    constructor() {
        super();
    }

    public setScore(score: number) {
        this.scoreText.text = score.toString(10).padStart(4, "0");
    }

    protected init() {
        super.init();

        this.scoreText = new PIXI.Text("0000");
        this.scoreText.resolution = 2;
        this.scoreText.style = new PIXI.TextStyle({
            fill: 0xffffff,
            fontSize: 45,
            fontFamily: "Minecraft",
            align: "left"
        });

        this.scoreText.x = GameApplication.STAGE_WIDTH * 0.85;
        this.scoreText.y = GameApplication.STAGE_HEIGHT * 0.9;

        this.label = new PIXI.Text("SCORE:");
        this.label.resolution = 2;
        this.label.style = new PIXI.TextStyle({
            fill: 0xffffff,
            fontSize: 45,
            fontFamily: "Minecraft",
            align: "left"
        });

        this.label.x = GameApplication.STAGE_WIDTH * 0.6;
        this.label.y = GameApplication.STAGE_HEIGHT * 0.9;

        this.addChild(this.scoreText);
        this.addChild(this.label);
    }

}