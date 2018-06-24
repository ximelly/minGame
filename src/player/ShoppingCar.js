import DrawImg from '../util/DrawImg'
import DateStore from '../util/DateStore'
/**
 * 背景类
 */
export default class ShoppingCar extends DrawImg{

  constructor(img) {
    super(img,0,0,img.width,img.height,0,0,100,100);

    //购物车的默认位置
    this.dateStore = DateStore.getInstance();
    this.width = img.width;
    this.height = img.height;
    this.canvas = this.dateStore.canvas;
    this.x = this.canvas.width / 2 - this.width / 2;
    this.y = this.canvas.height - this.height;
    this.remove();
  }


  remove(){
    wx.onTouchStart((e) => {
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;

      if (this.checkIsFingerOnCar(x, y)) {
        this.touched = true;
        this.setCarPos(x, y)
      }
    })

    wx.onTouchMove((e) => {
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      if (this.touched) { this.setCarPos(x, y)}
    })

    wx.onTouchEnd((e) => {
      this.touched = false;
    })
  }

/**
 * 当手指触摸购物车的时候
 * @param {Number} x: 手指的X轴坐标
 * @param {Number} y: 手指的Y轴坐标
 * @return {Boolean}: 用于标识手指是否在购物车的布尔值
 */
  checkIsFingerOnCar(x, y) {
    return !!(x >= this.x&& x <= this.x + this.width&&y>=this.y&&y<=this.y+this.height)
  }

  /**
   * 更新购物车的位置
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在购物车的布尔值
   */
  setCarPos(x,y){
    let disX = x - this.width / 2,
        disY = y-this.height/2;
    if (disX < 0) {
      disX = 0;
    }else if (disX > this.canvas.width - this.width){
      disX = this.canvas.width - this.width;
    }
    if (disY < 0) {
      disY = 0;
    } else if (disY > this.canvas.height - this.height) {
      disY = this.canvas.height - this.height;
    }
    this.x = disX;
    this.y = disY;
  }
}