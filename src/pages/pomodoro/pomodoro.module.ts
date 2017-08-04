import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PomodoroPage } from './pomodoro';

@NgModule({
  declarations: [
    PomodoroPage,
  ],
  imports: [
    IonicPageModule.forChild(PomodoroPage),
  ],
})
export class PomodoroPageModule {}
