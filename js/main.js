import Picture from './background/Picture'
import ShoppingCar from './player/ShoppingCar'
import Music from './background/Music'
import Ball from './base/Ball'
import Start from './player/Start'
import Count from './base/Count'
import DateStore from './base/DateStore'
import ResourceLoader from './base/ResourceLoader'
import Controller from './Controller'

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.dateStore = DateStore.getInstance();
    this.controller = Controller.getInstance();
    //this.music= new Music("audio/dream.mp3");
    new ResourceLoader().onLoaded(map => this.init(map))
  }
  init(map){
    this.dateStore.canvas = this.canvas;
    this.dateStore.ctx = this.ctx;
    this.dateStore.resource = map;
    this.dateStore.put("background", new Picture(this.ctx, map.get("background")))
      .put("balls", [])
      .put("count", new Count())
      .put("start", new Start(this.ctx, map.get("start")))
      .put("shoppingCar", new ShoppingCar(this.ctx, map.get("shoppingCar")))
      .put("ball", new Ball(this.ctx, map.get("ball")));
    this.controller.creatBalls();
    new Controller().run();
  }
}
