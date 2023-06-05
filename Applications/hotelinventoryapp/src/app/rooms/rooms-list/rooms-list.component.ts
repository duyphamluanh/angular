import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { Rooms, Room } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges, DoCheck{
  @Input() title: string = "";
  @Input() roomList: Rooms[] = [];
  @Output() selectedRoom = new EventEmitter<Rooms>(); 

  constructor() {
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
    if(changes['roomList']) {
      console.log('Room list changed');
    }
    console.log(changes)
  }

  ngDoCheck() {
   console.log('on changes is called');
  }

}
