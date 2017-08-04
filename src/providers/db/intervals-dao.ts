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

  public insertData(interval: any): any{

    var statement = "INSERT INTO intervals ("
    + "init_date, "
    + "end_date, "
    + "task_id "
    + ") values(?,?,?)";
    return this.dbManager.executeSql(statement ,
        [
          interval.init_date,
          interval.end_date,
          interval.task_id
        ]);
  }

  public updateData(interval: any): any{

    var statement = "UPDATE intervals "
    + "SET init_date = ?, "
    + "end_date = ?, "
    + "task_id = ? "
    + " WHERE id = ?";
    return this.dbManager.executeSql(statement ,
        [
          interval.init_date,
          interval.end_date,
          interval.task_id
        ]);
  }

}
