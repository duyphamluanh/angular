import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../rooms/service/rooms.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [RoomsService] // using as local instance
})
export class EmployeeComponent implements OnInit{

  employeeName: string = "John";

  constructor(private roomsService: RoomsService) {
  }

  ngOnInit(): void {
      
  }
}
