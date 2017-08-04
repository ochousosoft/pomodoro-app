import { Injectable } from '@angular/core';

@Injectable()
export class PomodoroMemory {

  private pomodoro: any;

  constructor() {

  }

  public set(pomodoro : any) {
    this.pomodoro = pomodoro;
  }

  public get() :  any {
    return this.pomodoro;
  }

}
