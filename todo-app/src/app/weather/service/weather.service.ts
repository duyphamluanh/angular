import { Inject, Injectable } from '@angular/core';
import { AppConfig } from 'src/app/AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  httpParams: HttpParams = new HttpParams();
  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private http: HttpClient) {
  }

  getCurrent(country: string = 'Vietnam', airQuality: boolean = false) {
    let aqi = (airQuality) ? 'yes' : 'no';
    this.httpParams = new HttpParams().set('key',this.config.apiWeatherkey).set('q', 'Vietnam').set('aqi', aqi)
    return this.http.get(this.config.apiWeather,{params: this.httpParams});
  }
}
