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
    this.gameTime=0;//开始游戏时长
    this.gameMaxTime = 600;//每关游戏最长时间
    this.dateStore.gameBllNum = 10;//每关要接到的小球个数
    this.dateStore.step=1;//默认第一关
    this.customerTouch=true;//是否监听用户触屏事件
  }
  run() {
    this.gameTime++;
    this.dateStore.get("background").draw();
    this.Count = this.dateStore.get("count");
    let timer;
    this.dealBalls();
    this.dateStore.get("shoppingCar").draw();
    if (this.gameOver === false) {//游戏进行中
      if (this.Count.Num >= this.dateStore.gameBllNum) {//游戏挑战成功
        this.gameIsOver(1);
      } else if (this.gameTime >= this.gameMaxTime) {//游戏挑战失败
        this.gameIsOver(2);
      } else {//游戏开始
        timer = requestAnimationFrame(() => this.run());
        this.dateStore.put("timer", timer);
      }
    } else if (this.gameOver === true){//游戏还未开始
      this.gameIsOver(3);
    }
  }
  //游戏状态处理
  gameIsOver(status){
    if (status === 1) {//挑战成功
      this.dateStore.get("success").draw();
      this.dateStore.speed += 0.6;//每关增加难度，小球运动速度增加
      this.dateStore.gameBllNum += 5;//每关增加难度，后一关比前一关多3
      this.dateStore.step++;//闯关进度加一
      this.customerTouch=true;
    } else if (status === 2) {//挑战失败
      this.dateStore.get("fail").draw();
      this.dateStore.speed=5;//重置
      this.dateStore.gameBllNum = 10;//重置
      this.dateStore.step = 1;//重置
      this.customerTouch=true;
    } else if (status === 3) {//游戏还未开始
      this.dateStore.get("start").draw();
    } 
    this.gameTime=0;
    this.gameOver = true;
    this.dateStore.music.pause();
    let timer = this.dateStore.get("timer");
    if (timer) {cancelAnimationFrame(timer);}
    if(status !== 3){this.dateStore.destory();}
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
          this.Count.Num += 1;
        }
      })
      if (Balls.length < this.dateStore.gameBllNum && (Balls.length==0||Balls[Balls.length - 1].y > shoppingCar.height +20)) {//如果小球的个数小于5并且最后一个出现的小球达到一定的高度，则创建一个新的球
        this.creatBalls();
      }
    }
    this.Count.draw();
  }
  
}