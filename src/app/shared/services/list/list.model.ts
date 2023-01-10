import {ItemModel} from "./item.model";


export interface ListModel{

  id:string;
  name:string;
  description:string;
  status:string;
  type:string;
  item_count:number;
  top_list_items:ItemModel[]

}
