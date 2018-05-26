import DateStore from './base/DateStore'
import Ball from "./base/Ball";
/**
 * 背景类
 */
export default class Controller {
  static getInstance(){
      if (!Controller.instance){
          Controller.instance = new Controller();
      }
      return Controller.instance;
  }
  constructor() {
    this.dateStore = DateStore.getInstance();
    this.dateStore.speed=3;
    this.dateStore.ballw = 50;
    this.gameOver = true;
  }
  run() {
    this.dateStore.get("background").draw();
    this.Count = this.dateStore.get("count");
    let timer;
    if (this.Count.Num >= 10 && this.gameOver === false) {
      this.gameOver = true;
      this.dealBalls();
      this.dateStore.get("start").draw();
      this.dateStore.music.pause();
      this.dateStore.music=null;
      cancelAnimationFrame(timer);
      this.dateStore.put("timer", null);
    } else if (this.gameOver === true){
      this.dateStore.get("start").draw();
    } else {
      this.dealBalls();
      timer = requestAnimationFrame(() => this.run());
      this.dateStore.put("timer", timer);
    }
    this.Count.draw();
    this.dateStore.get("shoppingCar").draw();
  }
  //新增小球
  creatBalls() {
    const x = Math.random() * (this.dateStore.canvas.width - this.dateStore.get("ballw"));
    this.dateStore.get("balls").push(new Ball(this.dateStore.ctx, this.dateStore.resource.get("ball"), x));
  }
  //处理小球跟购物车
  dealBalls() {
    const Balls = this.dateStore.get("balls");
    const shoppingCar = this.dateStore.get("shoppingCar");
    if (Balls && Balls.length > 0) {
      Balls.forEach(function (value) {
        value.draw();
      })
      if (Balls[0].y + Balls[0].ballw >= Balls[0].dateStore.canvas.height) {//小球触碰到地板就销毁
        Balls.shift();
      } else if ((Balls[0].x + Balls[0].ballw >= shoppingCar.x && Balls[0].x <= shoppingCar.x + shoppingCar.w) && ((Balls[0].y + Balls[0].ballw >= shoppingCar.y - 5) && (Balls[0].y + Balls[0].ballw<= shoppingCar.y))) {//小球触碰到购物车，销毁球&&计数器+1
        Balls.shift();
        this.Count.Num = this.Count.Num + 1;
      }
      if (Balls.length < 5 && Balls[Balls.length - 1].y > shoppingCar.height + 30) {//如果小球的个数小于5并且最后一个出现的小球达到一定的高度，则创建一个新的球
        this.creatBalls();
      }
    }
  }
}