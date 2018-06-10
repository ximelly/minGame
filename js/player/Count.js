import DateStore from '../base/DateStore'
/**
 * 计数器类
 */
export default class Count {
  constructor() {
    this.Num=0;
    this.dateStore=DateStore.getInstance();
    this.ctx=this.dateStore.ctx;
  }
  draw(){
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "18px Arial";
    if(this.dateStore.nickName){
      this.ctx.fillText("用户：" + this.dateStore.nickName +" 得分:" + this.Num, 20,50 );
    }else{
      this.ctx.fillText("当前得分:" + this.Num, 20,50 );
    }
    
    this.ctx.fillText("当前第" + this.dateStore.step + "关  目标分数" + this.dateStore.gameBllNum, 20,80);
  }
}