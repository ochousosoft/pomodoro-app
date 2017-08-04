import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DbManager } from '../providers/nutmobile/db-manager';
import { UserData } from '../providers/nutmobile/user-data';

import { HomePage } from '../pages/home/home';
import { PomodoroPage } from '../pages/pomodoro/pomodoro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = PomodoroPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private dbManager: DbManager,
    private userData: UserData
  ) {
    platform.ready().then(() => {
      this.dbManager.openDb().then(res=>{
        this.dbManager.initDb()
        console.log('Created DB!!!');
      })
      .catch(err=>{
        console.log(err);
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
