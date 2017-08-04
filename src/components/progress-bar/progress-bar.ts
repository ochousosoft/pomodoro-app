import { Component, Input } from '@angular/core';


@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {
  @Input('total') total;
  @Input('step') step;
  @Input('progress') progress;
  width;

  text: string;

  constructor() {

  }

  ionViewWillEnter(){
    let components = this.progress.split('/');
    this.width = (components[0]/components[1])*100;
  }

}
