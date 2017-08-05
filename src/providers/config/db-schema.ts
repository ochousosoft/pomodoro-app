import { Injectable } from '@angular/core';

@Injectable()
export class DbSchema {

  public static DB = {
    name : 'pomodoro-app',
    location: 'default',
    version : '0.0.1', //versión con las tablas base
    sql : [
      "DROP TABLE IF EXISTS projects;",
      "CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT, "
      + "name TEXT"
      + ");",

      "DROP TABLE IF EXISTS tasks;",
      "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, "
      + "name TEXT"
      + ");",

      "DROP TABLE IF EXISTS intervals;",
      "CREATE TABLE IF NOT EXISTS intervals (id INTEGER PRIMARY KEY AUTOINCREMENT, "
      + "init_date TEXT,"
      + "end_date TEXT"
      + ");",
    ],

    upgrades :[
      {
        version : '0.0.2',
        sql : [
          "ALTER TABLE intervals ADD COLUMN task_id TEXT;"
        ]
      },

      {
        version : '0.0.3',
        sql : [
          "ALTER TABLE intervals ADD COLUMN status INTEGER DEFAULT 0;"
        ]
      },

      {
        version : '0.0.4',
        sql : [
          "ALTER TABLE intervals ADD COLUMN pomodoro_number INTEGER DEFAULT 1;"
        ]
      },
    ]
  }

  constructor() {

  }

  public static getClearDDL() : any[] {
    let ddl: any = [];
    ddl.push("DELETE from projects");
    ddl.push("DELETE from tasks");
    ddl.push("DELETE from intervals");
    return ddl;
  };

}
