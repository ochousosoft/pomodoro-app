import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,  LoadingController } from 'ionic-angular';
import * as moment from 'moment';
import { NewPomodoroComponent } from '../../components/new-pomodoro/new-pomodoro';
import { PomodoroMemory } from '../../providers/memory/pomodoro-memory';
import { IntervalsDAO } from '../../providers/db/intervals-dao';
import { PomodoroProvider } from '../../providers/pomodoro.provider';

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {
  currentInterval:any;
  current_date;
  lapse;
  timerActive = false;

  loadProgress = 0;

  audio = new Audio();

  intervals:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private pomodoroMem: PomodoroMemory,
    private intervalsDAO: IntervalsDAO,
    private promodoroProvider: PomodoroProvider,
    public loadingCtrl: LoadingController,
  ) {

  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({
  		content: "Cargando..."
  	});
  	loading.present();

    this.intervalsDAO.findAll().then(result => {
      loading.dismiss();
      this.intervals = result['rows'];
    });

  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryPage');
  }

  newPomodoro(){
    let modal = this.modalCtrl.create(NewPomodoroComponent);
    modal.onDidDismiss(data => {
      this.currentInterval = this.pomodoroMem.get();
      this.current_date = moment().format('YYYY/MM/DD HH:mm:ss');
      this.pomodoroOn();
    });
    modal.present();
  }

  stopInterval(){
    this.timerActive = false;
    this.lapse.clearTimeout();
  }

  pomodoroOn(){
    this.timerActive = true;
    this.initCount();
  }

  initCount(){
    try{

      this.lapse = setTimeout(()=>{
        this.current_date = moment().format('YYYY/MM/DD HH:mm:ss');
        let difference = moment(this.currentInterval.end_date).diff(this.currentInterval.init_date);
        let currentDifference = moment(this.current_date).diff(this.currentInterval.init_date);
        this.loadProgress = Math.round(((currentDifference)/difference)*100);
        if(this.loadProgress<100){
          clearTimeout(this.lapse);
          if(this.timerActive){
            this.initCount();
          }
        }
        else{
          this.currentInterval.status = 1;

          this.promodoroProvider.saveInterval(this.currentInterval);

          this.currentInterval = null;
          this.pomodoroMem.set(this.currentInterval);
          this.timerActive = false;
          this.audio.src = 'assets/sounds/lapse-end.mp3';
          this.audio.load();
          this.audio.play();
        }

      }, 1000);
    }catch(err){
      console.log(err);
      throw 'Synchronization Error.';
    }
  }

}
