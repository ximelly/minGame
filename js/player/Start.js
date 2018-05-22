import DrawImg from '../base/DrawImg'
import DateStore from '../base/DateStore'
/**
 * 计数器类
 */
export default class Start extends DrawImg{
  constructor(ctx, img) {
    const canvas = DateStore.getInstance().canvas;
    super(ctx, img, 
          0, 0, 
          img.width, img.height, 
          (canvas.width - img.width) / 2, (canvas.height - img.height)/2-20, 
          img.width, img.height);
    
  }
}