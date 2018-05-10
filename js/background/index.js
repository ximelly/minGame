
/**
 * 背景类
 */
export default class BackGround{
  constructor(myCanvas) {
    let ctx = myCanvas.getContext('2d');
    var image = wx.createImage();
    image.onload = function () {
      ctx.drawImage(image,0,0, myCanvas.width, myCanvas.height)
    }
    image.src = 'images/bg.jpg'
  }
}