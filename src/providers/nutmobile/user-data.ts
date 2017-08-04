import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Constants } from './../config/constants';
// import { DbManager } from './db-manager';


@Injectable()
export class UserData {


  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(
    public events: Events,
    public storage: Storage
    ) {

  }

  public saveSession(session: any) {
    this.storage.set(Constants.APP_PREFIX + this.HAS_LOGGED_IN, true);
    this.setSession(session);
    this.setUsername(session.user);
    this.events.publish('user:login');
  }

  public destroySession() {
    //Check whether storage.remove is asynchronous
    return Promise.all([
      this.storage.remove(Constants.APP_PREFIX + this.HAS_LOGGED_IN),
      this.storage.remove(Constants.APP_PREFIX + 'username'),
      this.storage.remove(Constants.APP_PREFIX + 'session')
    ]).then((data : any) => {
      this.events.publish('user:logout');
    });
  }

  public logout() {
    // this.dbManager.clearTables();
    this.destroySession();
  }

  private setUsername(username: string) {
    this.storage.set(Constants.APP_PREFIX + 'username', username);
  }

  private setSession(session: any) {
    this.storage.set(Constants.APP_PREFIX + 'session', session);
  }

  // return a promise
  public getUsername() {
    return this.storage.get(Constants.APP_PREFIX + 'username');
  }

  // return a promise
  public hasLoggedIn() {
    return this.storage.get(Constants.APP_PREFIX + this.HAS_LOGGED_IN);
  }

  // return a promise
  public getSession() {
    return Observable.fromPromise(this.storage.get(Constants.APP_PREFIX + 'session'));
  }

  public getdbversion() {
    return this.storage.get(Constants.APP_PREFIX + 'db-version');
  }

  public setdbversion(version: any) {
    this.storage.set(Constants.APP_PREFIX + 'db-version', version);
  }
}
