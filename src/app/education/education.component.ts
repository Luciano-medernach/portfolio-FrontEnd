import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EducationService } from '../services/education.service';
import { Education } from '../shared/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent {
  constructor(private educationService: EducationService) {}

  education: Array<Education> = [];

  state = 'add';

  educationForm = new FormGroup({
    id: new FormControl<number | null>(null),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    institution: new FormControl('', [Validators.required]),
    date: new FormControl<number>(2000, [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  get title() {
    return this.educationForm.get('title');
  }
  get description() {
    return this.educationForm.get('description');
  }
  get date() {
    return this.educationForm.get('date');
  }
  get institution() {
    return this.educationForm.get('institution');
  }
  get image() {
    return this.educationForm.get('image');
  }

  clearModal() {
    this.educationForm.reset();
    this.state = 'add';
  }

  setModal(educ: any) {
    this.educationForm.setValue(educ);
    this.state = 'edit';
  }

  onSubmit() {
    if (this.state == 'add') {
      this.saveEducation();
    } else {
      this.editEducation();
    }
  }

  getEducation() {
    this.educationService
      .getEducation()
      .subscribe((data: Array<Education>) => (this.education = data));
  }

  saveEducation() {
    const educ: any = this.educationForm.value;
    delete educ['id'];

    this.educationService.saveEducation(educ).subscribe((data: Education) => {
      this.education.push(data);
    });
  }

  editEducation() {
    const educ: any = this.educationForm.value;

    this.educationService.editEducation(educ).subscribe(() => {
      this.getEducation();
    });
  }

  deleteEducation(id: any) {
    this.educationService.deleteEducation(id).subscribe(() => {
      this.getEducation();
    });
  }

  ngOnInit() {
    this.getEducation();
  }
}
