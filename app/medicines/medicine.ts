export default class Medicine {

  id:number;
  name:string;
  quantity:number;
  morning:boolean;
  midday:boolean;
  evening:boolean;
  //TODO : dawkowanie itp ...

  constructor(id:number, name:string, quantity:number, morning = false, midday = false, evening = false) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.morning = morning;
    this.midday = midday;
    this.evening = evening;
  }

}
