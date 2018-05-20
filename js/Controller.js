import DateStore from './base/DateStore'
/**
 * 背景类
 */
export default class Controller {
  constructor() {
    this.instance = DateStore.getInstance();
  }

  run(){
    this.instance.get("background").draw();
    this.instance.get("shoppingCar").draw();
    requestAnimationFrame(()=>this.run());
  }
}