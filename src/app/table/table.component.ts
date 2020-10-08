import { DataService } from './../services/data.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() students: any[];
  @Input() deletedStudents: any[];
  @Input() isDeleted;
  @Input() searchIsOn;

  femaleImgUrl: string;
  maleImgUrl: string;
  gender: string;
  editMode = new Array();
  isCompleted: boolean;
  studentObj: Object;

  constructor(private service: DataService) {
    this.femaleImgUrl =
      'https://www.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-512.png';
    this.maleImgUrl =
      'https://ziakapoor.com/wp-content/uploads/2020/03/zia-kapoor-escorts-happy-customers-1.png';
  }

  ngOnInit(): void {}

  delete(i, item) {
    this.deletedStudents = this.service.getDeletedStudents();

    this.deletedStudents.push(item);
    this.deletedStudents = this.deletedStudents.sort((a, b) => a.roll - b.roll);
    this.service.setDeletedStudents(this.deletedStudents);

    this.students.splice(i, 1);
    this.service.setStudents(this.students);
    // console.log(this.service.getStudents());
  }

  undoDelete(i, item) {
    this.students = this.service.getStudents();

    this.students.push(item);
    this.students = this.students.sort((a, b) => a.roll - b.roll);
    this.service.setStudents(this.students);

    this.deletedStudents.splice(i, 1);
    this.service.setDeletedStudents(this.deletedStudents);
    // console.log(this.service.getStudents());
  }

  updateStudent = (
    roll,
    name,
    city,
    college,
    qualification,
    gender,
    isCompleted
  ) => {
    this.students.map((item) =>
      item.roll === roll
        ? ((item.name = name),
          (item.city = city),
          (item.college = college),
          (item.qualification = qualification),
          (item.gender = gender),
          (item.isCompleted = isCompleted))
        : item
    );
  };

  editRow(student, index) {
    this.editMode[index] = true;
    this.gender = student.gender;
    this.isCompleted = student.isCompleted;
  }

  saveRow(student, index) {
    if (
      student.name === '' ||
      student.city === '' ||
      student.college === '' ||
      student.qualification === '' ||
      this.gender === ''
    ) {
      this.editMode[index] = true;
    } else {
      this.editMode[index] = false;
      this.updateStudent(
        student.roll,
        student.name,
        student.city,
        student.college,
        student.qualification,
        this.gender,
        this.isCompleted
      );
      this.service.setStudents(this.students);
      // console.log(this.service.getStudents());
    }
  }

  setGender(e) {
    if (e.target.value === 'female') {
      this.gender = 'female';
    } else {
      this.gender = 'male';
    }
  }
}
