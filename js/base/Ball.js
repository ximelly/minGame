import DrawImg from '../base/DrawImg'
import DateStore from '../base/DateStore'
/**
 * 球类
 */
export default class Ball extends DrawImg {
  constructor(ctx, img) {
    const ballw=50;
    super(ctx, img,0, 0, img.width, img.height,200, 0, ballw, ballw);
    this.ballw = ballw;
    this.dateStore = DateStore.getInstance();
    this.speed = this.dateStore.speed;
  }

  draw() {
    this.y += this.speed;
    const shoppingCar = this.dateStore.get("shoppingCar");
    console.log(shoppingCar.w);
    if (this.y + this.ballw >= this.dateStore.canvas.height || ((this.x + this.ballw >= shoppingCar.x && this.x <= shoppingCar.x + shoppingCar.w) && (this.y + this.ballw >= shoppingCar.y))) {//小球触碰到地板就销毁
      this.y = 0;
    }
    super.draw(this.ctx, this.image, this.srcX, this.srcY, this.srcW, this.srcH, this.x, this.y,this.ballw , this.ballw );
  }
}