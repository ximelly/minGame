import DrawImg from '../base/DrawImg'
import DateStore from '../base/DateStore'
/**
 * 背景类
 */
export default class Picture extends DrawImg{
  constructor(img) {
    super(img, 0, 0, img.width, img.height, 0, 0, DateStore.getInstance().canvas.width, DateStore.getInstance().canvas.height);
  }
}