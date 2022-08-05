import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  simulationSettings = new FormGroup({
    simulationDuration: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  startSimulation() {

  }
}
