import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DbManager} from '../nutmobile/db-manager';

/*
  Generated class for the SurveysProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TasksDAO {

  constructor(
    private dbManager: DbManager
  ) {

  }

  public findAll() {
    return this.dbManager.executeSql("SELECT * FROM tasks order by id  DESC", []);
  }

  public insertData(task: any): any{

    var statement = "INSERT INTO survey ("
    + "name "
    + ") values(?)";
    return this.dbManager.executeSql(statement ,
        [
          task.name
        ]);
  }

  public updateData(task: any): any{

    var statement = "UPDATE survey "
    + "SET name = ? "
    + " WHERE id = ?";
    return this.dbManager.executeSql(statement ,
        [
          task.name
        ]);
  }

}
