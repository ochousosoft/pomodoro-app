import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Constants } from './config/constants';
import { UserData } from './nutmobile/user-data';

import { IntervalsDAO } from './db/intervals-dao';


@Injectable()
export class PomodoroProvider {

  constructor(
    public http: Http,
    private userData: UserData,
    private intervals: IntervalsDAO
  ) {

  }

  public saveInterval(interval){
    return new Promise ((resolve,reject) => {
      if(interval.id){
        this.intervals.updateData(interval).then((data: any) =>{
          // let insertId = data.insertId;
          resolve(null);
        }).catch((err: any) =>{
          reject(null);
        });
      }
      else{
        this.intervals.insertData(interval).then((data: any) =>{
          let insertId = data.insertId;
          resolve(insertId);
        }).catch((err: any) =>{
          reject(null);
        });
      }

    });
  }



  sqlRowListToArray(sqlRowList: any, dateFields: any[], imageFields: any[]) {
    let data : any[] = [];
    for (let i=0;i<sqlRowList.length;i++) {
      let obj = sqlRowList.item(i);
      // for (let j=0;j<dateFields.length;j++) {
      //   let dateField = dateFields[i];
      //   obj[dateField] = this.helper.formatDate(obj[dateField], 'YYYY-MM-DD',0)
      // }
      // for (let j=0;j<imageFields.length;j++) {
      //   let imageField = imageFields[i];
      //   obj[imageField] = obj[imageField].substring(22); //removed data/image:png....
      // }
      data.push(obj);
    }
    return data;
  }


}
