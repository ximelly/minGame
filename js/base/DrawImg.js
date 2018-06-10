import ResourceLoader from './ResourceLoader'
import DateStore from './DateStore'
/**
 *绘制图片类
 */
export default class DrawImg {
  constructor(image = null,
              srcX = 0,srcY = 0,
              srcW = 0,srcH = 0,
              x = 0,y=0,
              w = 0,h = 0) {
    this.ctx = DateStore.getInstance().ctx;
    this.image = image;
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcW = srcW;
    this.srcH = srcH;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw(){
    this.ctx.drawImage(this.image,
                      this.srcX,this.srcY,
                      this.srcW,this.srcH,
                      this.x,this.y,
                      this.w, this.h);
  }
}