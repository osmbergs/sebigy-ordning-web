import {ListModel} from "./list.model";

export interface PaginatedListModel{

  items:ListModel[];
  total:number;
  page:number;
  size:number;

}
