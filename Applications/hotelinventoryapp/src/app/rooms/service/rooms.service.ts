import { Inject, Injectable } from '@angular/core';
import { Rooms } from '../rooms';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from 'src/app/AppConfig/appconfig.interface';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  roomList : Rooms[] = [];
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig, 
    private http: HttpClient) {
  }

  getRooms() {
    return this.http.get<Rooms[]>('/api/rooms');
  }
  
  addRooms(rooms: Rooms) {
    return this.http.post<Rooms[]>('/api/rooms', rooms);
  }

  editRoom(rooms: Rooms) {
    return this.http.put<Rooms[]>(`/api/rooms/${rooms.roomNumber}`, rooms)
  }

  delete(id: string) {
    return this.http.delete<Rooms[]>(`/api/rooms/${id}`)
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/photos',
      {
        reportProgress: true,
        observe: 'events',
      }
    )
    return this.http.request(request);
  }
}
