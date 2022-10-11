import * as PIXI from 'pixi.js';
import { GameView } from '../../views/GameView';
import { GameObject } from '../GameObject';
import { GameApplication } from '../../GameApplication';
import { BrickCollisionBehavior } from '../behavior/BrickCollisionBehavior';
import { BrickType } from './BrickType';
import { BrickHideBehavior } from '../behavior/BrickHideBehavior';
import { GraphicUtils } from '../../GraphicUtils';
import { Model } from '../../Model';
import { BrickColorChangeBehavior } from '../behavior/BrickColorChangeBehavior';

export class LevelFactory extends PIXI.Container {

    private bricks: Array<GameObject>;
    private gameViewRef: GameView;
    private brickTop: number = 100;

    constructor(gameViewRef: GameView) {
        super();

        this.gameViewRef = gameViewRef;
        this.init();
    }

    public getNextLevel(level: number): Array<GameObject> {
        if(level === 1) {
            return this.getLevel(1);
        }

        if(level > 1) {
            return this.getLevel(2);
        }
    }

    private getLevel(difficulty: number): Array<GameObject> {
        let nbrBrickHorizontal: number;
        let nbrBrickVertical: number;
        let brickWidth: number;
        let brickHeight: number;
        const startPos: number = 2;

        this.bricks = [];

        if(difficulty === 1) {
            nbrBrickHorizontal = 10;
            nbrBrickVertical = 3;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH - 4) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);
            for(let i = 0; i < nbrBrickVertical; i++) {
                for(let j = 0; j < nbrBrickHorizontal; j++) {
                    const brick: GameObject = this.brickFactory(1, brickWidth, brickHeight);
                    brick.x = j === 0 ? j * brickWidth + startPos : j * brickWidth;
                    brick.y = (i * brickHeight) + this.brickTop;
                    this.bricks.push(brick);
                }
            }
            return this.bricks;
        }

        if(difficulty === 2) {
            nbrBrickHorizontal = 15;
            nbrBrickVertical = 3;
            Model.getInstance().setTotalNbrBrick(nbrBrickHorizontal * nbrBrickVertical);
            brickWidth = (GameApplication.STAGE_WIDTH - 4) / nbrBrickHorizontal;
            brickHeight = Math.floor(GameApplication.STAGE_HEIGHT * 0.03);
            for(let i = 0; i < nbrBrickVertical; i++) {
                for(let j = 0; j < nbrBrickHorizontal; j++) {
                    let difficulty: number;
                    const rand: number = Math.random();
                    if(rand <= 0.1) {
                        difficulty = 3;
                    } else if(rand > 0.1 && rand <= 0.3) {
                        difficulty = 2;
                    } else if(rand > 0.3) {
                        difficulty = 1;
                    }
                    const brick: GameObject = this.brickFactory(difficulty, brickWidth, brickHeight);
                    brick.x = j === 0 ? j * brickWidth + startPos : j * brickWidth;
                    brick.y = (i * brickHeight) + this.brickTop;
                    this.bricks.push(brick);
                }
            }
            return this.bricks;
        }

        return this.bricks;
    }

    private init() {
        this.bricks = [];
    }

    private brickFactory(difficulty: number, width: number, height: number): GameObject {
        const brick: GameObject = new GameObject(this.gameViewRef);
        const gfx: PIXI.Graphics = new PIXI.Graphics();

        switch(difficulty) {
            case 1:
                {
                    gfx.beginFill(0xa1c2f7);
                    gfx.lineStyle({width: 1, color: 0x000000})
                    gfx.drawRect(0, 0, width, height);
                    gfx.endFill();
                    brick.registerRenderable("brickImg", new PIXI.Sprite(GameApplication.getApp().renderer.generateTexture(gfx)));

                    const brickCollisionBehavior: BrickCollisionBehavior = new BrickCollisionBehavior(brick);
                    brickCollisionBehavior.setBrickType(BrickType.TYPE_1);
                    brick.registerBehavior("collision", brickCollisionBehavior);

                    const brickHitBehavior: BrickHideBehavior = new BrickHideBehavior(brick);
                    brickHitBehavior.setBrickType(BrickType.TYPE_1);
                    brick.registerBehavior("hide", brickHitBehavior);
                }
                break;
            case 2:
                {
                    gfx.beginFill(0xffffff);
                    gfx.lineStyle({width: 1, color: 0x000000})
                    gfx.drawRect(0, 0, width, height);
                    gfx.endFill();
                    const sprite: PIXI.Sprite = new PIXI.Sprite(GameApplication.getApp().renderer.generateTexture(gfx));
                    sprite.tint = 0xff0000;
                    brick.registerRenderable("brickImg", sprite);

                    const brickCollisionBehavior: BrickCollisionBehavior = new BrickCollisionBehavior(brick);
                    brickCollisionBehavior.setBrickType(BrickType.TYPE_2);
                    brick.registerBehavior("collision", brickCollisionBehavior);

                    const brickHitBehavior: BrickHideBehavior = new BrickHideBehavior(brick);
                    brickHitBehavior.setBrickType(BrickType.TYPE_2);
                    brick.registerBehavior("hide", brickHitBehavior);

                    const brickColorBehavior: BrickColorChangeBehavior = new BrickColorChangeBehavior(brick);
                    brick.registerBehavior("color", brickColorBehavior);
                }
                break;
                case 3:
                    {
                        gfx.beginFill(0xffff00);
                        gfx.lineStyle({width: 1, color: 0x000000})
                        gfx.drawRect(0, 0, width, height);
                        gfx.endFill();
                        const sprite: PIXI.Sprite = new PIXI.Sprite(GameApplication.getApp().renderer.generateTexture(gfx));
                        brick.registerRenderable("brickImg", sprite);
    
                        const brickCollisionBehavior: BrickCollisionBehavior = new BrickCollisionBehavior(brick);
                        brickCollisionBehavior.setBrickType(BrickType.TYPE_3);
                        brick.registerBehavior("collision", brickCollisionBehavior);
    
                        const brickHitBehavior: BrickHideBehavior = new BrickHideBehavior(brick);
                        brickHitBehavior.setBrickType(BrickType.TYPE_3);
                        brick.registerBehavior("hide", brickHitBehavior);
    
                    }
                    break;
        }
        
        return brick;
    }
}