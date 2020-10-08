import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  studentsData: any[];
  deletedStudents: any[];
  searchIsOn: boolean;
  isFound: boolean;
  searchName: string;
  selectedStudents = new Array();
  studentObj: Object;

  constructor(private service: DataService) {
    this.searchIsOn = false;
    this.isFound = true;
    this.searchName = '';
  }

  ngOnInit(): void {
    this.deletedStudents = this.service.getDeletedStudents();
    // console.log(this.deletedStudents);
    this.studentsData = this.service.getStudents();
    // console.log(this.students.length);

    if (this.studentsData.length === 0) {
      this.service.getJSON().subscribe((data) => {
        this.studentObj = data;
        this.studentsData = Object.values(this.studentObj);
        // console.log(this.students);
      });
    }
  }

  search() {
    this.searchIsOn = true;

    this.service.setStudents(this.studentsData);

    let found = this.studentsData.find((item) => item.name === this.searchName);

    if (this.searchName === '') {
      this.isFound = true;
      this.searchIsOn = false;
    } else if (this.searchName !== '' && found === undefined) {
      this.isFound = false;
    } else {
      this.studentsData = this.studentsData.filter(
        (item) => item.name === this.searchName
      );
      this.isFound = true;
    }
    this.searchName = '';
    console.log(this.service.getStudents());
  }

  back() {
    this.isFound = true;
    this.searchIsOn = false;
    this.studentsData = this.service.getStudents();
    console.log(this.service.getStudents());

    this.service.setStudents(this.studentsData);
  }

  deleteSelected() {
    // this.studentsData = this.service.getStudents();
    this.deletedStudents = this.service.getDeletedStudents();

    this.selectedStudents = this.studentsData.filter(
      (item) => item.isCompleted === true
    );

    if (this.selectedStudents.length > 0) {
      this.studentsData = this.studentsData.filter(
        (item) => item.isCompleted === false
      );
      this.service.setStudents(this.studentsData);

      this.selectedStudents.map((item) => {
        this.deletedStudents.push(item);
      });
      this.deletedStudents = this.deletedStudents.sort(
        (a, b) => a.roll - b.roll
      );
      this.service.setDeletedStudents(this.deletedStudents);
    } else {
      alert('Please select at least one item to delete.');
    }
  }

  updateData() {
    this.studentsData = this.service.getStudents();
  }
}
