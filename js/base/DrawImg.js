import ResourceLoader from './ResourceLoader'
/**
 *绘制图片类
 */
export default class DrawImg {
  constructor(ctx = null,
              image = null,
              srcX = 0,srcY = 0,
              srcW = 0,srcH = 0,
              x = 0,y=0,
              w = 0,h = 0) {
    this.ctx = ctx;
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

  draw(ctx=this.ctx,image = this.image, srcX = this.srcX, srcY = this.srcY, srcW = this.srcW, srcH=this.srcH, x=this.x, y=this.y, w=this.w, h=this.h) {
    this.ctx.drawImage(image, srcX, srcY, srcW, srcH,x,y,w,h);
  }
}