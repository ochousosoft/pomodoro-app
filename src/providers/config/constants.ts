import { Injectable } from '@angular/core';

@Injectable()
export class Constants {

  constructor() {

  }

  public static APP_VERSION = "v0.0.1";

  public static MODE = "prod";

  //avoid collision with other apps in webview
  public static APP_PREFIX = 'pomodoro-app';

  public static API_URL = 'http://185.129.248.113:8013/server/api';

  public static ID_EMPRESA = 140;

  public static DB_NAME = 'pomodoro-app';
  //android
  public static DB_LOCATION = 'default';
  //ios
  public static IOS_DB_LOCATION = 'Library';

}
