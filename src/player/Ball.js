import DrawImg from '../util/DrawImg'
import DateStore from '../util/DateStore'
/**
 * 球类
 */
export default class Ball extends DrawImg {
  constructor(img,x) {
    const ballw = DateStore.getInstance().ballw;
    super(img,0, 0, img.width, img.height, x , 0, ballw, ballw);
    this.dateStore = DateStore.getInstance();
    this.ballw = this.dateStore.ballw;
    this.dateStore.put("ballw",this.ballw);
    this.speed = this.dateStore.speed;
  }

  draw() {
    this.y += this.speed;
    super.draw(this.image, this.srcX, this.srcY, this.srcW, this.srcH, this.x, this.y,this.ballw , this.ballw );
  }
}