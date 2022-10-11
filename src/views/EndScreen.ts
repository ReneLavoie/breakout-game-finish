import * as PIXI from "pixi.js";
import { BaseView } from './BaseView';
import { GameApplication } from '../GameApplication';

export class EndScreen extends BaseView {

    private background: PIXI.Graphics;
    private title: PIXI.Text;
    private body: PIXI.Text;

    constructor() {
        super();
    }

    protected init() {
        super.init();
        this.createBackground();
        this.createText();
    }

    private createBackground() {
        this.background = new PIXI.Graphics();
        this.background.lineStyle({width: 2, color: 0xffffff});
        this.background.beginFill(0x000000);
        this.background.drawRect(0, 0, GameApplication.STAGE_WIDTH, GameApplication.STAGE_HEIGHT);
        this.background.endFill();
        this.addChild(this.background);
    }

    private createText() {
        this.title = new PIXI.Text("YOU LOST");
        this.title.anchor.set(0.5, 0.5);
        this.title.resolution = 2;
        this.title.style = new PIXI.TextStyle({
            fill: 0xffffff,
            fontSize: 45,
            fontFamily: "Minecraft",
            align: "center"
        });

        this.body = new PIXI.Text("PRESS ANY KEY TO START AGAIN");
        this.body.anchor.set(0.5, 0.5);
        this.body.resolution = 2;
        this.body.style = new PIXI.TextStyle({
            fill: 0xffffff,
            fontSize: 35,
            fontFamily: "Minecraft",
            align: "center"
        });

        this.title.x = this.background.width * 0.5;
        this.title.y = this.background.height * 0.3;

        this.body.x = this.background.width * 0.5;
        this.body.y = this.background.height * 0.5;

        this.addChild(this.title);
        this.addChild(this.body);
    }
}