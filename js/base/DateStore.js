/**
 * 存储变量
 */
export default class DateStore {
  static getInstance(){
    if (!DateStore.instance){
      DateStore.instance = new DateStore();
    }
    return DateStore.instance;
  }
  constructor() {
    this.map=new Map();
  }

  get(key){
    return this.map.get(key);
  }

  put(key,value){
    this.map.set(key,value);
    return this;
  }

  destory(){
    for(let value of this.map.values()){
      value=null;
    }
  }

}