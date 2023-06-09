import { Inject, Injectable } from '@angular/core';
import { Rooms } from '../rooms';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from 'src/app/AppConfig/appconfig.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  roomList : Rooms[] = [
    // {
    //   roomNumber: '1',
    //   roomType: 'Deluxe Room',
    //   amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
    //   price: 500,
    //   photos:
    //     'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    //   checkinTime: new Date('11-Nov-2021'),
    //   checkoutTime: new Date('12-Nov-2021'),
    //   rating: 4.5,
    // },
    // {
    //   roomNumber: '2',
    //   roomType: 'Deluxe Room',
    //   amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
    //   price: 1000,
    //   photos:
    //     'https://images.unsplash.com/photo-1674109759637-82b0659b7bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    //   checkinTime: new Date('11-Nov-2021'),
    //   checkoutTime: new Date('12-Nov-2021'),
    //   rating: 3.45654,
    // },
    // {
    //   roomNumber: '3',
    //   roomType: 'Private Suite',
    //   amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
    //   price: 15000,
    //   photos:
    //     'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    //   checkinTime: new Date('11-Nov-2021'),
    //   checkoutTime: new Date('12-Nov-2021'),
    //   rating: 2.6,
    // },
  ];

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private http: HttpClient) { 
    console.log(this.config.apiEndpoint);
    console.log('Rooms service Initialized...')
  }
  // Ừ thi you can truyền biến vô để lấy đúng cái room you muốn sau khi api trả về
  // Còn hiện tại thì trả về từ cái list dài vl phía trên. 
  getRooms() {
    return this.http.get<Rooms[]>('/api/rooms');
  }
}
