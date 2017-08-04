import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { NewPomodoroComponent } from '../../components/new-pomodoro/new-pomodoro';

/**
 * Generated class for the PomodoroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pomodoro',
  templateUrl: 'pomodoro.html',
})
export class PomodoroPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {

  }

  ionViewDidLoad() {

  }

  newPomodoro(){
    let modal = this.modalCtrl.create(NewPomodoroComponent);
    modal.present();
  }



}
