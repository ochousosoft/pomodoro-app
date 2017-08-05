import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DbManager} from '../nutmobile/db-manager';


@Injectable()
export class IntervalsDAO {

  constructor(
    private dbManager: DbManager
  ) {

  }

  public findAll() {
    return this.dbManager.executeSql("SELECT * FROM intervals order by id  DESC", []);
  }

  public findCurrent() {
    return this.dbManager.executeSql("SELECT * FROM intervals WHERE status = 0 order by id  DESC", []);
  }

  public insertData(interval: any): any{

    var statement = "INSERT INTO intervals ("
    + "init_date, "
    + "end_date, "
    + "status, "
    + "pomodoro_number, "
    + "task_id "
    + ") values(?,?,?,?,?)";
    return this.dbManager.executeSql(statement ,
        [
          interval.init_date,
          interval.end_date,
          interval.status,
          interval.pomodoro_number,
          interval.task_id
        ]);
  }

  public updateData(interval: any): any{

    var statement = "UPDATE intervals "
    + "SET init_date = ?, "
    + "end_date = ?, "
    + "status = ?, "
    + "pomodoro_number = ?, "
    + "task_id = ? "
    + " WHERE id = ?";
    return this.dbManager.executeSql(statement ,
        [
          interval.init_date,
          interval.end_date,
          interval.status,
          interval.pomodoro_number,
          interval.task_id,
          interval.id
        ])
        .catch(err=>{
          console.log(err);
        });
  }

}
