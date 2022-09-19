import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }


  public getEnvironment():any
  {
      return environment;


  }



}
