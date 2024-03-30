import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Todos } from '../todo.interface';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter(), DatePipe],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
})
export class UpdateComponent implements OnInit {
  @Input() todoData: Todos[] = [];
  @Output() closeCreateEvent = new EventEmitter<void>();
  _id: string = '';
  title: string = 'test';
  desc: string = '';
  status: string = 'Active';
  finishDate: Date = new Date();
  selectedDate: string = '';
  selectedTime: string = '';
  validate: boolean = false;
  userData: any;
  constructor(
    private datePipe: DatePipe,
    private todoService: TodoService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserData();
    console.log('todoData', this.todoData);
    this.mapData();
  }

  mapData() {
    this._id = this.todoData[0]._id;
    this.title = this.todoData[0].title;
    this.desc = this.todoData[0].desc;
    this.status = this.todoData[0].status;
    this.finishDate = this.todoData[0].finishAt;
    this.selectedDate =
      this.datePipe.transform(this.finishDate, 'yyyy-MM-dd') ?? '';
    this.selectedTime = this.datePipe.transform(this.finishDate, 'HH:mm') ?? '';
    this.combineDateTime();
  }

  getUserData() {
    this.userData = this.userService.getUserData();
  }

  closeCreate() {
    this.closeCreateEvent.emit();
  }

  formatDate(date: string) {
    const dateFormat = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.selectedDate = dateFormat ? dateFormat : '';
    this.combineDateTime();
  }

  formatTime(time: string) {
    this.selectedTime = time;
    this.combineDateTime();
  }

  combineDateTime() {
    if (this.selectedDate && this.selectedTime) {
      const selectedDateTime = new Date(
        this.selectedDate + 'T' + this.selectedTime + ':00'
      );
      this.finishDate = selectedDateTime;
      this.validateForm();
    }
  }

  validateForm() {
    if (this.title && this.desc && this.finishDate) {
      this.validate = true;
    } else {
      this.validate = false;
    }
  }

  Create() {
    const _id = this._id;
    const title = this.title;
    const desc = this.desc;
    const status = this.status;
    const finishDate = this.finishDate;
    if (this.validate) {
      this.todoService
        .updateTodo(_id, title, desc, status, finishDate)
        .subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Update Successful',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              this.todoService.triggerUpdate();
              this.closeCreate();
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something error please try agian',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              this.closeCreate();
            });
          },
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please fill all fields',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
