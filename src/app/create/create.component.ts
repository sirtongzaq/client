import { Component, EventEmitter, Output, OnInit } from '@angular/core';
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
  selector: 'app-create',
  standalone: true,
  imports: [
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './create.component.html',
  providers: [provideNativeDateAdapter(), DatePipe],
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  title: string = '';
  desc: string = '';
  status: string = 'Active';
  finishDate: Date | null = null;
  selectedDate: string = '';
  selectedTime: string = '';
  validate: boolean = false;
  userData: any;
  @Output() closeCreateEvent = new EventEmitter<void>();
  constructor(
    private datePipe: DatePipe,
    private todoService: TodoService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userData = this.userService.getUserData();
    // console.log('userData', this.userData);
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
    if (this.validate) {
      console.log('Create', this.finishDate);
      const todo: Todos = {
        user_id: this.userData._id,
        title: this.title,
        desc: this.desc,
        status: this.status,
        finishAt: this.finishDate ? this.finishDate : new Date(),
        createdAt: new Date(),
        _id: '',
      };
      this.todoService.createTodos(todo).subscribe({
        next: (res) => {
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Create Successful',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.todoService.triggerUpdate();
            this.closeCreate();
          });
        },
        error: (err) => {
          console.log(err);
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
        title: 'Oops...',
        text: 'Please fill all the fields',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
