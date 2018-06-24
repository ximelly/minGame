import { ImgResource } from './Resource' 

export default class ResourceLoader{  
  constructor() {
    this.map = new Map(ImgResource);
    for(let [key,value] of this.map){
      const image = wx.createImage();
      image.src = value;
      this.map.set(key,image);
    }
  }

  onLoaded(callBack){
    for (let value of this.map.values()) {
      var count = 1;
      value.onload= ()=>{
        count++;
        if (count >= this.map.size) {
          callBack(this.map);
        }
      }
    }
  }
}
