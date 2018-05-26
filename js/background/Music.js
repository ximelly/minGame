/**
 * 背景音乐类
 */
export default class Music {
  constructor(musicSource) {
    this.audio = wx.createInnerAudioContext();
    this.audio.src = musicSource;
    this.audio.autoplay = false;
    this.audio.loop = true;
  }
  play(){
    this.audio.play();
  }
  pause() {
    this.audio.pause();
  }
}