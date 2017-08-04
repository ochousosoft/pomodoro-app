import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { NewPomodoroComponent } from './new-pomodoro/new-pomodoro';
@NgModule({
	declarations: [ProgressBarComponent,
    NewPomodoroComponent],
	imports: [],
	exports: [ProgressBarComponent,
    NewPomodoroComponent]
})
export class ComponentsModule {}
