/**
 * 背景音乐类
 */
export default class Music {
  constructor(musicSource) {
    var InnerAudioContext = wx.createInnerAudioContext();
    InnerAudioContext.src = musicSource;
    InnerAudioContext.autoplay = true;
    InnerAudioContext.loop = true;
  }
}