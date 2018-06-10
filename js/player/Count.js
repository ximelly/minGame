import DateStore from '../base/DateStore'
/**
 * 计数器类
 */
export default class Count {
  constructor() {
    this.Num=0;
    this.ctx=DateStore.getInstance().ctx;
  }
  draw(){
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "20px Arial";
    this.ctx.fillText("当前得分：" + this.Num, 20, 50);
  }
}