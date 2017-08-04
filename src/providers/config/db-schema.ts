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
