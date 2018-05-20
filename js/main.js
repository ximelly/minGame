import Picture from './background/Picture'
import ShoppingCar from './player/ShoppingCar'
import Music from './background/Music'
import Ball from './base/Ball'
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
    this.music= new Music("audio/dream.mp3");
    new ResourceLoader().onLoaded(map => this.init(map))
  }
  init(map){
    this.dateStore.canvas = this.canvas;
    this.dateStore.ctx = this.ctx;
    this.dateStore.resource = this.map;
    this.dateStore.speed=2;
    this.dateStore.put("background", new Picture(this.ctx, map.get("background")));
    this.dateStore.put("shoppingCar", new ShoppingCar(this.ctx, map.get("shoppingCar")));
    this.dateStore.put("ball", new Ball(this.ctx, map.get("ball")));
    new Controller().run();
  }
}
