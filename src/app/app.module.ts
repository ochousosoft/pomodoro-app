import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import {TranslateLoader, TranslateStaticLoader, TranslateModule} from "ng2-translate";
import {HttpModule} from '@angular/http';


import { MyApp } from './app.component';
//Pages
import { HomePage } from '../pages/home/home';
import { PomodoroPage } from '../pages/pomodoro/pomodoro';
//Components
import { NewPomodoroComponent } from '../components/new-pomodoro/new-pomodoro';
import { ProgressBarComponent} from '../components/progress-bar/progress-bar';


import { Constants } from '../providers/config/constants';

//Nut mobile
import { UserData } from '../providers/nutmobile/user-data';
import { DbManager } from '../providers/nutmobile/db-manager';

//Memory service
import { PomodoroMemory } from '../providers/memory/pomodoro-memory';

//DB service
import { IntervalsDAO } from '../providers/db/intervals-dao';
import { ProjectsDAO } from '../providers/db/projects-dao';
import { TasksDAO } from '../providers/db/tasks-dao';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PomodoroPage,


    ProgressBarComponent,
    NewPomodoroComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PomodoroPage,


    NewPomodoroComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,

    PomodoroMemory,

    IntervalsDAO,
    ProjectsDAO,
    TasksDAO,

    DbManager,
    UserData
  ]
})
export class AppModule {}
