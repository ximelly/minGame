import DateStore from './base/DateStore'
import Ball from "./player/Ball";
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
    this.dateStore.speed=5;
    this.dateStore.ballw = 50;
    this.gameOver = true;
  }
  run() {
    this.dateStore.get("background").draw();
    this.Count = this.dateStore.get("count");
    let timer;
    this.dateStore.get("shoppingCar").draw();
    if (this.Count.Num >= 10 && this.gameOver === false) {
      this.gameOver = true;
      this.dealBalls();
      this.dateStore.music.pause();
      this.dateStore.music=null;
      this.drawStrat();
      cancelAnimationFrame(timer);
      this.dateStore.destory();
    } else if (this.gameOver === true){
      this.drawStrat();
    } else {
      this.dealBalls();
      timer = requestAnimationFrame(() => this.run());
      this.dateStore.put("timer", timer);
    }
  }
  drawStrat(){
    this.dateStore.get("start").draw();
  }
  //新增小球
  creatBalls() {
    const x = Math.random() * (this.dateStore.canvas.width - this.dateStore.get("ballw"));
    this.dateStore.get("balls").push(new Ball(this.dateStore.resource.get("ball"), x));
  }
  //处理小球跟购物车
  dealBalls() {
    const Balls = this.dateStore.get("balls");
    const shoppingCar = this.dateStore.get("shoppingCar");
    if (Balls && Balls.length > 0) {
      Balls.forEach((value, index)=>{
        value.draw();
        if (Balls[index].y + Balls[index].ballw >= Balls[index].dateStore.canvas.height) {//小球触碰到地板就销毁
          Balls.splice(index, 1);
        } else if ((Balls[index].x + Balls[index].ballw >= shoppingCar.x && Balls[index].x <= shoppingCar.x + shoppingCar.w) && ((Balls[index].y + Balls[index].ballw >= shoppingCar.y - 5) && (Balls[index].y + Balls[index].ballw <= shoppingCar.y))) {//小球触碰到购物车，销毁球&&计数器+1
          Balls.splice(index, 1);
          this.Count.Num = this.Count.Num + 1;
        }
      })
      if (Balls.length < 10 && (Balls.length==0||Balls[Balls.length - 1].y > shoppingCar.height +20)) {//如果小球的个数小于5并且最后一个出现的小球达到一定的高度，则创建一个新的球
        this.creatBalls();
      }
    }
    this.Count.draw();
  }
  
}