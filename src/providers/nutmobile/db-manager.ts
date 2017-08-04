import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Platform, Events } from 'ionic-angular';
import { Constants } from './../config/constants';
import { DbSchema } from './../config/db-schema';
import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@ionic-native/sqlite';

import { UserData } from './user-data';


@Injectable()
export class DbManager {

  //Reference to Db
  private db : any = undefined;

  public static DICTIONARY = {
        select: 'SELECT ',
        insert: 'INSERT INTO ',
        update: 'UPDATE ',
        delete: 'DELETE FROM ',
        values: ' VALUES ',
        returning: ' RETURNING * ',
        set: ' SET ',
        asterisk: ' * ',
        from: ' FROM ',
        where: ' WHERE ',
        limit: ' LIMIT ',
        offset: ' OFFSET ',
        order_by: ' ORDER BY ',
        group_by: ' GROUP BY ',
        $like: ' LIKE ',
        $nlike: ' NOT LIKE ',
        $eq: ' = ',
        $gt: ' > ',
        $gte: ' >= ',
        $lt: ' < ',
        $lte: ' <= ',
        $ne: ' <> ',
        $in: ' IN ',
        $nin: ' NOT IN ',
        $null: ' IS NULL ',
        $nnull: ' IS NOT NULL ',
        $and: ' AND ',
        $or: ' OR '
    };

  private tables:any;

  constructor(
    public http: Http,
    public platform: Platform,
    public events: Events,
    public sqlite: SQLite,
    public userData: UserData) {
    //this.openDb();
  }

  getDb() {
    if (!this.db) {
      this.openDb();
    }
    return this.db;
  }

  public openDb() {
    return new Promise ((resolve,reject) => {
      if (this.db === undefined){
        //singleton
        if (this.platform.is('cordova')) {
          // running on device

          let dbSettings: SQLiteDatabaseConfig;
          if (this.platform.is('ios')) {
            dbSettings = {name: Constants.DB_NAME, iosDatabaseLocation: Constants.IOS_DB_LOCATION};
          }
          else {
            dbSettings = {name: Constants.DB_NAME, location: Constants.DB_LOCATION};
          }

          this.sqlite.create(dbSettings)
            .then((db: SQLiteObject) => {
              this.db = db;

              console.log("DbManager: Db opened succesfully");
              this.events.publish('db:opened');

              resolve(this.db);

              // this.initDb(DbSchema.getDDL()).then(data => {
              //   resolve(this.db);
              // }, err => {
              //   reject(err);
              // });

            })
        }
        else {
          // running on browser (dev mode)
          const _window : any = window; // get around plugin namespace pollution
          this.db = _window.openDatabase(Constants.DB_NAME, '1.0', 'database', -1);
          console.log("DbManager: Db opened succesfully");
          this.events.publish('db:opened');

          // this.initDb(DbSchema.getDDL());

          resolve(this.db);
        }
      }
      else {
        resolve(this.db);
      }
    });
  }

  public initDb() {
    let sqlquery;
    let baseDbVersion = DbSchema.DB.version;
    let lastDbVersion = baseDbVersion; //En caso de no haber upgrades se coge la version base;
    if(DbSchema.DB.upgrades.length > 0){
      lastDbVersion = DbSchema.DB.upgrades[DbSchema.DB.upgrades.length - 1].version; //Ultima version de base de datos.
    }
    this.userData.getdbversion().then((userDbVersion) => {//TODO THEN
      if(!userDbVersion){ //El usuario no tiene dbversion, primera vez que se instala --> Creamos bd desde 0.
        //Bucle for con las tablas base
        this.applyBase();
        this.applyUpgrades(0);
        // this.userData.setdbversion(baseDbVersion);
      }else{ // El usuario ya tiene una dbversion, ya tenía la app instalada. --> Aplicamos upgrades
        userDbVersion = userDbVersion; //Obtenemos la version de bd del usuario actual.
        if(userDbVersion !== lastDbVersion){
          let positiondbv; //Posicion a partir de la que tenemos que recorrer upgrades.
          if(userDbVersion == baseDbVersion){ //Si es la version base la instalada, solo tenemos que recorrer los upgrade.
            //Bucle tablas upgrades
            positiondbv = 0;
          }
          else{
            //Obtenemos la posicion del upgrade que se corresponde con nuestra dbversion.
            for (var i=0;i < DbSchema.DB.upgrades.length; i++) {
              if(DbSchema.DB.upgrades[i].version == userDbVersion){
                positiondbv = i + 1;
              }
            }
          }
          this.applyUpgrades(positiondbv);
        }
        else{ //userDbVersion es igual a la ultima version de la bd.
          console.log('La version de la base de datos ya es la última.');
        }
      }

      this.executeSql("SELECT * FROM sqlite_master WHERE name NOT LIKE 'sqlite\\_%' escape '\\' AND name NOT LIKE '\\_%' escape '\\'", []).then(result => {
        this.tables = {};
        for (var int = 0; int < result['rows'].length; int++) {
          // console.log('consulte');
          var table=result['rows'].item(int);
          var s = table.sql.split(',');
          s[0] = s[0].replace(new RegExp('create\\s+table\\s+' + table.name + '\\s*\\(', 'i'),'');
          table.fields = s.map(function(i){
            return i.trim().split(/\s/).shift();
          })
          .filter(function(i){
            return (i.indexOf(')') === -1)
          })

          for (var i = 0; i < table.fields.length; i++){
            if ((table.fields[i] == "UNIQUE") || (table.fields[i] == "PRIMARY_KEY")||(table.fields[i] == "id")){
              table.fields.splice(i,1);
              i--;
            }
            for (var j = 0; j < i; j++){
              if (table.fields[i] == table.fields[j]){
                table.fields.splice(i,1);
              }
            }
          }
          this.tables[table.name] = table;
        }
        this.userData.setdbversion(lastDbVersion);
      });
    });
  }

  private execsqlSync(query: string, bindings: any) {
    bindings = typeof bindings !== 'undefined' ? bindings : {};
    this.getDb().transaction(function(transaction) {
      transaction.executeSql(query.trim(), bindings);
    });
  };

  private applyBase(){
    for (var i=0;i < DbSchema.DB.sql.length; i++) {
      this.execsqlSync(DbSchema.DB.sql[i], []);
      console.log('create');
    }
  }

  private applyUpgrades(baseIndex){
    for (var i=baseIndex;i < DbSchema.DB.upgrades.length; i++) {
      for(var j=0;j < DbSchema.DB.upgrades[i].sql.length; j++){
        this.execsqlSync(DbSchema.DB.upgrades[i].sql[j], []);
        console.log('create');
      }
    }
  }

  public clearTables() {
    let schemaClauses = DbSchema.getClearDDL();
    for (let i=0;i<schemaClauses.length; i++) {
      if (this.platform.is('cordova')) {
            this.db.executeSql(schemaClauses[i], []).then(() => {
          }, (err: any) => {
            console.error('Unable to execute sql: ', JSON.stringify(err));
          });
      }
      else {
        //websql
        if (this.db === undefined) {
          this.openDb();
        }
        this.db.transaction((tx: any) => {
          tx.executeSql(schemaClauses[i], []);
        });
      }

    };
    console.log("DbManager: Deleted tables successfully");
  };

  public qualify(value: any) {
    return "'" + value + "'";
  };

  public executeSql(sql: string, bindings:  any) {
    if (this.platform.is('cordova')) {
      //device
      return new Promise ((resolve,reject) => {
        this.openDb().then((data) => {
          //TODO view bindings
          this.db.executeSql(sql, bindings).then((result: any) => {
            resolve(result);
          }, (error: any) => {
            reject(error);
          });
        });
      })
      .catch(err => {
        throw err.message;
      });
    }
    else {
      //websql
      return new Promise ((resolve,reject) => {
        this.openDb().then((data: any) => {
          this.db.transaction((tx: any) => {
            tx.executeSql(sql, bindings, (tx: any,result: any) => {
              resolve(result);
            });
          }, (err: any) => {
            // Some code
            reject(err);
          });
        });
      });
    };
  };


  //They can either be a single string of SQL or an array beginning with the SQL and then containing placeholders. Called like so:
  // this._batch([
  //   "CREATE TABLE version (version INT NOT NULL PRIMARY KEY)",
  //   ["INSERT INTO version (version) VALUES ($1)", [1]],
  // ]);
  public batchSql(stmts: any[]): Promise<any> {
    let rv: Promise<any> = new Promise((resolve, reject) => {
      let wincb = (dbrv: any) => {
        resolve(dbrv);
      };

      let losecb = (tx: any, err: Error) => {
        reject(err);
        return false;
      };
      this.db.sqlBatch(stmts, function() {
        resolve();
      }, function(err: any) {
        reject(err)
      });
    //   this.db.transaction((tx: any) => {
    //     let nstmts = stmts.length;
    //     for (let ix = 0; ix < nstmts; ix++) {
    //       if (ix % 500 == 0) {
    //         console.log('Insertando: ' + ix);
    //       }
    //       let item = stmts[ix];
    //       let sql:string;
    //       let phs:any[];
    //       if (Array.isArray(item)) {
    //         sql = item[0];
    //         phs = item[1];
    //       } else {
    //         sql = stmts[ix];
    //         phs = [];
    //       }
    //       tx.executeSql(sql, phs, undefined, losecb);
    //     }
    //   }, losecb, wincb);
    });
    return rv;
  };
}
