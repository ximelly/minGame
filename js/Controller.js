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
    this.dateStore.speed=2;
    this.dateStore.ballw =50;
    this.Count = this.dateStore.get("count");
  }
  creatBalls(){
    const x = Math.random() * (this.dateStore.canvas.width - this.dateStore.get("ballw"));
    this.dateStore.get("balls").push(new Ball(this.dateStore.ctx, this.dateStore.resource.get("ball"),x));
  }
  run(){
    this.dateStore.get("background").draw();
    this.dateStore.get("shoppingCar").draw();
    this.Count.draw();
    const Balls=this.dateStore.get("balls");
    const shoppingCar = this.dateStore.get("shoppingCar");
    if (Balls[0].y + Balls[0].ballw >= Balls[0].dateStore.canvas.height) {//小球触碰到地板就销毁
      Balls.shift();
    } else if ((Balls[0].x + Balls[0].ballw >= shoppingCar.x && Balls[0].x <= shoppingCar.x + shoppingCar.w) && (Balls[0].y + Balls[0].ballw >= shoppingCar.y)) {//小球触碰到购物车，销毁球&&计数器+1
      Balls.shift();
      this.Count.Num = this.Count.Num+1;
    }
    if (Balls.length < 5 && Balls[Balls.length - 1].y > shoppingCar.height+30){
        this.creatBalls();
    }

    this.dateStore.get("balls").forEach(function(value){
      value.draw();
    })
    let timer=requestAnimationFrame(()=>this.run());
    this.dateStore.put("timer", timer);
    if (this.Count.Num>=10){
      this.dateStore.get("start").draw();
      cancelAnimationFrame(timer);
      console.log("恭喜你！闯关成功");
    }
    
    
  }
}