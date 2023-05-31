import { Component, OnInit, OnChanges, SimpleChange, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Room, Rooms } from './rooms';
import { Observable } from 'rxjs';

@Component({
  selector: "app-rooms",
  templateUrl: "./rooms.component.html",
  styleUrls: ["./rooms.component.scss"],
})
export class RoomsComponent implements OnInit, OnChanges {
  hideRooms = true;
  numberOfRooms = 10;
  hotelName = "Hilton Hotel";
  buttonShow = "Show more...";
  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 10,
  };
  roomList: Rooms[] = [];
  selectedRoom: Rooms | undefined;
  titleBase: String = "Room list";
  title = "";

  constructor() {
    this.roomList = [
      {
        roomNumber: 1,
        roomType: 'Deluxe Room',
        amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
        price: 500,
        photos:
          'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        checkinTime: new Date('11-Nov-2021'),
        checkoutTime: new Date('12-Nov-2021'),
        rating: 4.5,
      },
      {
        roomNumber: 2,
        roomType: 'Deluxe Room',
        amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
        price: 1000,
        photos:
          'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        checkinTime: new Date('11-Nov-2021'),
        checkoutTime: new Date('12-Nov-2021'),
        rating: 3.45654,
      },
      {
        roomNumber: 3,
        roomType: 'Private Suite',
        amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
        price: 15000,
        photos:
          'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        checkinTime: new Date('11-Nov-2021'),
        checkoutTime: new Date('12-Nov-2021'),
        rating: 2.6,
      },
    ];
  }

  ngOnInit(): void {
    console.log('RoomsComponent inited.')
    this.title = this.getTitle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedRoom']) {
      console.log('Selected Room changed')
    }
  }

  getTitle(): string {
    return this.titleBase + ' (' + this.roomList.length.toString() + ')';
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.buttonShow = this.hideRooms ? "Show more ..." : "Show less ...";
  }

  selectRoom(room: Rooms) {
    this.selectedRoom = room;
    console.log('Received from Child:', this.selectedRoom);
  }

  addRoom() {
    const room: Rooms = {
        roomNumber: 4,
        roomType: 'Deluxe Room VIP',
        amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen, Humans',
        price: 1500,
        photos:
          'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        checkinTime: new Date('12-Nov-2021'),
        checkoutTime: new Date('13-Nov-2021'),
        rating: 5,
    }

    // this.roomList.push(room);
    this.roomList = [...this.roomList,room];
    this.title = this.getTitle();
  }
}
