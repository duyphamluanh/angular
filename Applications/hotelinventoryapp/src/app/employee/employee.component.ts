import { Component, OnInit, Optional, Self } from '@angular/core';
import { RoomsService } from '../rooms/service/rooms.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [
    RoomsService,
    LoggerService
  ] // using as local instance
})
export class EmployeeComponent implements OnInit{

  employeeName: string = "John";

  constructor(@Self() private roomsService: RoomsService, @Optional() private loggerService: LoggerService) {
  }

  ngOnInit(): void {
    this.loggerService?.log('LoggerService on EmployeeComponent.onInit()');
  }
}
