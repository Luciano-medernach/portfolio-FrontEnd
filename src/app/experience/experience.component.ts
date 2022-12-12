import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { audit } from 'rxjs';
import { ExperienceService } from '../services/experience.service';
import { Experience } from '../shared/experience.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent {
  constructor(private experienceService: ExperienceService) {}

  experience: Array<Experience> = [];
  warning = '';

  state: String = 'add';

  experienceForm = new FormGroup({
    id: new FormControl<Number | null>(null),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    employer: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  get title() {
    return this.experienceForm.get('title');
  }
  get description() {
    return this.experienceForm.get('description');
  }
  get date() {
    return this.experienceForm.get('date');
  }
  get employer() {
    return this.experienceForm.get('employer');
  }
  get image() {
    return this.experienceForm.get('image');
  }

  clearModal() {
    this.experienceForm.reset();
    this.state = 'add';
  }

  setModal(exp: Experience) {
    this.experienceForm.setValue(exp);
    this.state = 'edit';
  }

  onSubmit() {
    if (this.state == 'edit') {
      this.editExperience();
    } else {
      this.saveExperience();
    }
  }

  getExperience() {
    this.experienceService
      .getExperience()
      .subscribe((data: Array<Experience>) => (this.experience = data));
  }

  saveExperience() {
    const exp: any = this.experienceForm.value;
    delete exp['id'];

    this.experienceService
      .saveExperience(exp)
      .subscribe((data: any) => this.experience.push(data));
  }

  editExperience() {
    const exp: any = this.experienceForm.value;

    this.experienceService.editExperience(exp).subscribe(() => {
      this.getExperience();
    });
  }

  deleteExperience(id: any) {
    this.experienceService.deleteExperience(id).subscribe(() => {
      this.getExperience();
    });
  }

  ngOnInit() {
    this.getExperience();
  }
}
