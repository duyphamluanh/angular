import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Rooms, Room } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent {
  @Input() roomList: Rooms[] = [];
  @Output() selectedRoom = new EventEmitter<Rooms>(); 

  constructor() {
  }

  selectRoom(rooms: Rooms) {
    this.selectedRoom.emit(rooms);
  }
}
