import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private simulationInProgress = false;

  initSimulation() {

  }

  runSimulation() {
    this.simulationInProgress = true;
  }
}
