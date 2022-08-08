import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-on-road',
  templateUrl: './vehicle-on-road.component.html',
  styleUrls: ['./vehicle-on-road.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleOnRoadComponent implements OnInit {

  @Input() public queue: number = 0;
  @Input() public passedQueue: number = 0;
  @Input() public position: string = '';
  @Input() public imgSrc: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
