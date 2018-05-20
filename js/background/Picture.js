import DrawImg from '../base/DrawImg'
import DateStore from '../base/DateStore'
/**
 * 背景类
 */
export default class Picture extends DrawImg{
  constructor(ctx,img) {
    super(ctx, img, 0, img.height - DateStore.getInstance().canvas.height, img.width, DateStore.getInstance().canvas.height, 0, 0, DateStore.getInstance().canvas.width, DateStore.getInstance().canvas.height);
    this.reHeight = img.height - DateStore.getInstance().canvas.height;
    this.top=0;
    this.speed=2;
  }
  draw(){
    this.top += this.speed;
    if (this.top >= this.image.height - DateStore.getInstance().canvas.height) {
      this.top = 0;
    }
    super.draw(this.ctx, this.image, this.srcX, this.image.height - DateStore.getInstance().canvas.height - this.top, this.image.width, this.srcH, this.x, this.y, this.w, this.h);
  }
}