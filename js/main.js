//import home from './home/index'
import BackGround from './background/index'

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    let myCanvas = wx.createCanvas();
    let aa = new BackGround(myCanvas);
    //添加背景图片
    //var image = wx.createImage();
    //image.onload = function () {
    //ctx.drawImage(image, 0, 0, myCanvas.width*1.5, myCanvas.height);
    //}
    //image.src = 'images/bg.jpg';

    //登录&获取微信步数
    wx.login({
      success: function (res) {
        wx.getWeRunData({
          success: function (res) {
            console.log(res);
          },
          fail: function (res) {
            console.log(res);
          }
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })

    //触屏事件
    wx.onTouchStart(function(e){
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      console.log(x+"...."+y);
    })

    //添加音频
    var InnerAudioContext = wx.createInnerAudioContext();
    InnerAudioContext.src = "audio/dream.mp3";
    InnerAudioContext.autoplay = true;
    InnerAudioContext.loop = true;
  }
}
