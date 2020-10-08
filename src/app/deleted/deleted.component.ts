import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.css'],
})
export class DeletedComponent implements OnInit {
  studentsData: any[];
  deletedStudents: any[];
  selectedStudents = new Array();
  studentObj: Object;

  constructor(private service: DataService) {
    this.studentsData = service.getStudents();
    this.deletedStudents = service.getDeletedStudents();
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

  undoSelectedDeletes() {
    this.studentsData = this.service.getStudents();
    // this.deletedStudents = this.service.getDeletedStudents();

    this.selectedStudents = this.deletedStudents.filter(
      (item) => item.isCompleted === true
    );

    if (this.selectedStudents.length > 0) {
      this.deletedStudents = this.deletedStudents.filter(
        (item) => item.isCompleted === false
      );
      this.service.setDeletedStudents(this.deletedStudents);

      this.selectedStudents.map((item) => {
        this.studentsData.push(item);
      });
      this.studentsData = this.studentsData.sort((a, b) => a.roll - b.roll);
      this.service.setStudents(this.studentsData);
    } else {
      alert('Please select at least one item to undo delete.');
    }
  }
}
