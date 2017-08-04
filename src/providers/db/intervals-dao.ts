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
export class SurveysDAO {

  constructor(
    private dbManager: DbManager
  ) {

  }

  public findAll() {
    return this.dbManager.executeSql("SELECT * FROM intervals order by id  DESC", []);
  }

  public insertData(survey: any): any{

    var statement = "INSERT INTO survey ("
    + "init_date, "
    + "end_date "
    + ") values(?,?)";
    return this.dbManager.executeSql(statement ,
        [
          survey.init_date,
          survey.end_date
        ]);
  }

  public updateData(survey: any): any{

    var statement = "UPDATE survey "
    + "SET init_date = ?, "
    + "end_date = ? "
    + " WHERE id = ?";
    return this.dbManager.executeSql(statement ,
        [
          survey.init_date,
          survey.end_date
        ]);
  }

}
