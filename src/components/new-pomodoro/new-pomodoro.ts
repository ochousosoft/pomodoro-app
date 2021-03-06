import { Component } from '@angular/core';
import { ViewController} from 'ionic-angular';

import * as moment from 'moment';

import { PomodoroMemory } from '../../providers/memory/pomodoro-memory';

import { PomodoroProvider } from '../../providers/pomodoro.provider';


@Component({
  selector: 'new-pomodoro',
  templateUrl: 'new-pomodoro.html'
})
export class NewPomodoroComponent {

  project_id;
  task_id;
  initDate;
  endDate;

  projects = [
    {id:1, name: 'Arousa Norte App'},
    {id:2, name: 'Arousa Norte Backend'},
    {id:3, name: 'Boiro Rutas App'},
    {id:4, name: 'Sopega 2017'},
    {id:5, name: 'Procuradores'},
    {id:6, name: 'Arousa Norte App'},
  ];

  tasks = [
    {id:1, name: 'Arousa Norte App task 1', project_id: 1},
    {id:2, name: 'Arousa Norte App task 2', project_id: 1},
    {id:3, name: 'Arousa Norte App task 3', project_id: 1},
    {id:4, name: 'Arousa Norte Backend task 1', project_id: 2},
    {id:5, name: 'Procuradores task 1', project_id: 5},
    {id:6, name: 'Procuradores task 2', project_id: 5},
  ];

  constructor(
    private viewCtrl: ViewController,
    private pomodoroMem: PomodoroMemory,
    private pomodoroProvider: PomodoroProvider
  ) {

  }

  cancel(){
    this.viewCtrl.dismiss();
  }

  continue(){
    this.initDate = moment().format('YYYY-MM-DD HH:mm:ss');
    this.endDate = moment(this.initDate).add(1, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    let interval:any = {init_date: this.initDate, end_date:this.endDate, task_id: this.task_id, status: 0, pomodoro_number: 1};
    this.pomodoroProvider.saveInterval(interval).then(result=>{
      interval.id = result;
      this.pomodoroMem.set(interval);
      this.viewCtrl.dismiss();
    });

  }

}
