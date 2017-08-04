import { Component } from '@angular/core';
import { ViewController} from 'ionic-angular';

@Component({
  selector: 'new-pomodoro',
  templateUrl: 'new-pomodoro.html'
})
export class NewPomodoroComponent {

  text: string;

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
    private viewCtrl: ViewController
  ) {

  }

  cancel(){
    this.viewCtrl.dismiss();
  }

  continue(){
    this.viewCtrl.dismiss();
  }

}
