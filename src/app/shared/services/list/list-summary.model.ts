import {ItemModel} from "./item.model";


export interface ListSummaryModel{

  id:string;
  name:string;
  description:string;
  status:string;
  type:string;
  lastItems:ItemModel[]


}
