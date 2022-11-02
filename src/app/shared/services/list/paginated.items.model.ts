import {ListModel} from "./list.model";
import {ItemModel} from "./item.model";

export interface PaginatedItemsModel{

  items:ItemModel[];
  total:number;
  page:number;
  size:number;

}
