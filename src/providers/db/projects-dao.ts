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
export class ProjectsDAO {

  constructor(
    private dbManager: DbManager
  ) {

  }

  public findAll() {
    return this.dbManager.executeSql("SELECT * FROM projects order by id  DESC", []);
  }

  public insertData(project: any): any{

    var statement = "INSERT INTO projects ("
    + "name "
    + ") values(?,?)";
    return this.dbManager.executeSql(statement ,
        [
          project.name
        ]);
  }

}
