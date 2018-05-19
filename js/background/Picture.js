import DrawImg from '../base/DrawImg'
/**
 * 背景类
 */
export default class Picture extends DrawImg{
  constructor(ctx,img) {
    super(ctx,img,0,0,img.width,img.height,0,0,window.innerWidth,window.innerHeight);
  }
}