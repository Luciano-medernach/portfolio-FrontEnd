import { Component } from '@angular/core';
import { EducationService } from '../services/education.service';
import { Education } from '../shared/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent {
  education: Array<Education> = [];

  constructor(private educationService: EducationService) {}

  getEducation() {
    this.educationService
      .getEducation()
      .subscribe((data: Array<Education>) => (this.education = data));
  }

  ngOnInit() {
    this.getEducation();
  }
}
