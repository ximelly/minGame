import Picture from './background/Picture'
import ShoppingCar from './player/ShoppingCar'
import Music from './background/Music'
import Ball from './player/Ball'
import Start from './player/Start'
import Status from './player/Status'
import Count from './player/Count'
import DateStore from './util/DateStore'
import ResourceLoader from './util/ResourceLoader'
import Controller from './Controller'

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.dateStore = DateStore.getInstance();
    this.controller = Controller.getInstance();
    new ResourceLoader().onLoaded(map => this.onResourceFirstLoaded(map));
  }
  onResourceFirstLoaded(map){
    this.dateStore.canvas = this.canvas;
    this.dateStore.ctx = this.ctx;
    this.dateStore.resource = map;
    this.init();
  }
  init(){
    this.dateStore.music = new Music("res/audio/dream.mp3");
    this.dateStore.put("background", new Picture(this.dateStore.resource.get("background")))
      .put("balls", [])
      .put("count", new Count())
      .put("start", new Start(this.dateStore.resource.get("start")))
      .put("success", new Status(this.dateStore.resource.get("success")))
      .put("fail", new Status(this.dateStore.resource.get("fail")))
      .put("shoppingCar", new ShoppingCar(this.dateStore.resource.get("shoppingCar")))
      .put("ball", new Ball(this.dateStore.resource.get("ball")));
    this.startBtn();
    this.controller.run();
  }
  startBtn(){
    wx.onTouchStart((e) => {
      if(this.controller.customerTouch===false){
          return;
      }
      this.controller.customerTouch=false;
      if (this.controller.gameOver) {
        if(!this.dateStore.nickName&&!this.controller.customerRefuse){
          const that=this;
          wx.login({
            success: function () {
              wx.getUserInfo({
                fail: function (res) {
                  // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                  if (res.errMsg.indexOf('auth deny') > -1 ||     res.errMsg.indexOf('auth denied') > -1 ){
                    wx.showToast({
                      title:"用户已拒绝",
                      icon:"none"
                    })
                    that.controller.customerRefuse=true;
                    that.start();
                  }
                },
                success:function(res){
                  var name=JSON.parse(res.rawData).nickName?JSON.parse(res.rawData).nickName:""
                  that.dateStore.nickName = name;
                  that.start();
                }
              })
            }
          })
        }else{
          this.init();
          this.start();
        }
      }
    });
  }

  start(){
    if (!this.dateStore.music){
      this.dateStore.music = new Music("audio/dream.mp3");
    }
    this.dateStore.music.play();
    this.controller.gameOver = false;
    this.dateStore.put("balls", []);
    this.controller.creatBalls();
    this.dateStore.get("count").Num = 0;
    this.controller.run();
  }
}
