import DrawImg from '../base/DrawImg'
import DateStore from '../base/DateStore'
/**
 * 计数器类
 */
export default class Start extends DrawImg{
  constructor(img) {
    const canvas = DateStore.getInstance().canvas;
    super(img, 
          0, 0, 
          img.width, img.height, 
          (canvas.width - img.width/1.2) / 2, (canvas.height - img.height/1.2)/2-20, 
          img.width/1.2, img.height/1.2);
    
  }
}