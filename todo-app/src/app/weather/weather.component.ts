import { Component, OnInit, Optional } from '@angular/core';
import { WeatherService } from './service/weather.service';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  providers: [WeatherService],
})
export class WeatherComponent implements OnInit {
  weather: any = [];
  constructor(@Optional() private weatherService: WeatherService) {}

  ngOnInit(): void {
    interval(1800*1000)
      .pipe(switchMap(() => this.weatherService.getCurrent()))
      .subscribe((datas) => {
        this.weather = datas;
        console.log('Successful weather sync')
      });
    this.weatherService.getCurrent().subscribe(response => {
      if(response) {
        this.weather = response;
      }
    });
  }
}
