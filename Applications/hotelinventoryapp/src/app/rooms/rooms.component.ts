import { Component, OnInit } from '@angular/core';
import { Room } from './rooms';

@Component({
  selector: "app-rooms",
  templateUrl: "./rooms.component.html",
  styleUrls: ["./rooms.component.scss"],
})
export class RoomsComponent implements OnInit {
  hotelName = "Hilton Hotel";
  numberOfRooms = 10;
  hideRooms = true;
  buttonShow = "Show more...";
  rooms: Room = {
    availableRoom: 10,
    bookedRoom: 10,
    totalRooms: 20,
  };
  color= "";

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.buttonShow = this.hideRooms ? "Show more ..." : "Show less ...";
  }

  toggleColor() {
    switch (this.color) {
      case 'red':
        this.color = 'blue';
        break;
      case 'blue':
        this.color = 'green';
        break;
      case 'green':
        this.color = '';
        break;
      default:
        this.color = 'red';
        break;
    }
  }
}
