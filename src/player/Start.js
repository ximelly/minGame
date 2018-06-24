import DrawImg from '../util/DrawImg'
import DateStore from '../util/DateStore'
/**
 * 计数器类
 */
export default class Start extends DrawImg{
  constructor(img) {
    const canvas = DateStore.getInstance().canvas;
    super(img, 
          0, 0, 
          img.width, img.height, 
          (canvas.width - img.width) / 2, (canvas.height - img.height)/2-20, 
          img.width, img.height);
    
  }
}