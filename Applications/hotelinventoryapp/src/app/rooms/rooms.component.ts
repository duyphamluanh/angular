import { Component, OnInit, OnChanges, SimpleChange, ChangeDetectionStrategy, SimpleChanges, ViewChild, AfterViewInit, ViewChildren, QueryList, Inject, Self, Optional, OnDestroy } from '@angular/core';
import { Room, Rooms } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomsService } from './service/rooms.service';
import { Observable, Subscription, tap } from 'rxjs';
import { HttpEventType, HttpProgressEvent } from '@angular/common/http';

@Component({
  selector: "app-rooms",
  templateUrl: "./rooms.component.html",
  styleUrls: ["./rooms.component.scss"],
  providers: [RoomsService]
})
export class RoomsComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  stream = new Observable(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    observer.error('error')
  })
  // @ViewChild(HeaderComponent, { static: true })
  // headerComponent: HeaderComponent = new HeaderComponent;
  @ViewChild('roomheader', { static: true })
  headerComponent: HeaderComponent = new HeaderComponent;
  @ViewChildren(RoomsListComponent) children!: QueryList<RoomsListComponent>;

  title = "";
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
  subscription! : Subscription;
  rooms$ =  this.roomService.getRooms$;

  constructor(@Optional() private roomService: RoomsService) { // Dependencies Injection
    // this.roomList = this.roomService.getRooms(); // We should call it in ngOnInit when the components properties and inputs are fully intialized
  }

  ngOnInit(): void {
    console.log('RoomsComponent inited.')
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err)
    })

    this.roomService?.getPhotos().subscribe(photos => {
      switch(photos.type) {
        case HttpEventType.Sent:
          console.log('Request sent to server'); break;
        case HttpEventType.ResponseHeader:
          console.log('Response header received');break;
        case HttpEventType.DownloadProgress: 
          const progressEvent = photos as HttpProgressEvent;
          if(progressEvent.total) {
            const percentDone = Math.round(100 * progressEvent.loaded / progressEvent.total);
            console.log(`File download progress: ${percentDone}%`);
          } else {
            console.log(`Receiving...${progressEvent.loaded/1024} KB`);
          }
          break;
        case HttpEventType.Response: 
          console.log('Response received');
          console.log(photos);
          break;
        default:
          break;
      }
    });
    // this.roomService?.getRooms().subscribe(rooms => {
    // this.subscription = this.roomService?.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    //   this.title = this.getTitle();
    // }); 
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedRoom']) {
      console.log('Selected Room changed')
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.headerComponent.title = "Good morning!";
      this.children.forEach(child => {
        console.log(child)
      })
    }, 0);
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
        roomNumber: '4',
        roomType: 'Deluxe Room VIP',
        amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen, Humans',
        price: 1500,
        photos:
          'https://images.unsplash.com/photo-1674109759637-82b0659b7bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
        checkinTime: new Date('12-Nov-2021'),
        checkoutTime: new Date('13-Nov-2021'),
        rating: 5,
    }

    // this.roomList.push(room);
    // this.roomList = [...this.roomList,room];
    this.roomService.addRooms(room).subscribe((data) => {
      this.roomList = data;
      this.title = this.getTitle();
    });
  }

  editRoom() {
      const room: Rooms = {
        roomNumber: '3',
        roomType: 'Deluxe Room VIP',
        amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen, Humans',
        price: 1500,
        photos:
          'https://images.unsplash.com/photo-1674109759637-82b0659b7bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
        checkinTime: new Date('12-Nov-2022'),
        checkoutTime: new Date('13-Nov-2022'),
        rating: 5,
    }
    this.roomService.editRoom(room).subscribe((data) => {
        this.roomList = data;
    }) 
  }
  
  deleteRoom(roomid: string) {
      this.roomService.delete(roomid).subscribe((data) => {
        this.roomList = data;
    }) 
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
