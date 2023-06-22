import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit, OnChanges, SimpleChanges, DoCheck, OnDestroy } from '@angular/core';
import { Rooms, Room } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy{
  @Input() title: string = "";
  @Input() rooms: Rooms[] | null= [];
  @Input() roomCount!: number | null ;
  @Output() selectedRoom = new EventEmitter<Rooms>(); 
  @Output() deletedRoom = new EventEmitter<string>(); 

  constructor() {
  }

  deleteRoom(rooms: Rooms) {
    this.deletedRoom.emit(rooms.roomNumber);
  }

  selectRoom(rooms: Rooms) {
    this.selectedRoom.emit(rooms);
  }

  ngOnInit(): void {
    console.log('RoomsListComponent inited.')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['title']) {
      this.title = changes['title'].currentValue;
      console.log('Room list title changed: ' + this.title)
    }
    if(changes['rooms']) {
      console.log('Room list changed');
    }
    console.log(changes)
  }

  ngOnDestroy(): void {
    console.log('rooms: on destroy is called');
  }
}
