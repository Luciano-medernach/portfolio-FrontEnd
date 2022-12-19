import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { audit } from 'rxjs';
import { ExperienceService } from '../services/experience.service';
import { ImageService } from '../services/image.service';
import { Experience } from '../shared/experience.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent {
  constructor(
    private experienceService: ExperienceService,
    private imageService: ImageService
  ) {}

  experience: Array<Experience> = [];
  warning = '';

  state: String = 'add';

  image: any;

  experienceForm = new FormGroup({
    id: new FormControl<Number | null>(null),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    employer: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    image: new FormControl<Number | null>(null),
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

  clearModal() {
    this.experienceForm.reset();
    this.state = 'add';
  }

  setModal(exp: Experience) {
    let aux = { ...exp };
    delete aux['retrievedImage'];
    this.experienceForm.setValue(aux);
    this.state = 'edit';
  }

  onSubmit() {
    if (this.state == 'edit') {
      this.editExperience();
    } else {
      this.saveExperience();
    }
  }

  handleChange(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  getExperience() {
    this.experienceService
      .getExperience()
      .subscribe((data: Array<Experience>) => {
        this.experience = data;
        data.forEach((exp) => {
          this.imageService.getImage(exp.image).subscribe((image: any) => {
            exp['retrievedImage'] = 'data:image/jpeg;base64,' + image.content;
          });
        });
      });
  }

  saveExperience() {
    const exp: any = this.experienceForm.value;
    delete exp['id'];

    this.imageService.saveImage(this.image).subscribe((data: any) => {
      exp['image'] = data.id;

      this.experienceService.saveExperience(exp).subscribe(() => {
        this.getExperience();
      });
    });
  }

  editExperience() {
    const exp: any = this.experienceForm.value;

    this.experienceService.editExperience(exp).subscribe((data: any) => {
      this.imageService.editImage(data.image, this.image).subscribe(() => {
        this.getExperience();
      });
    });
  }

  deleteExperience(id: any, imageId: any) {
    this.experienceService.deleteExperience(id).subscribe(() => {
      this.getExperience();
    });
    this.imageService.deleteImage(imageId).subscribe();
  }

  ngOnInit() {
    this.getExperience();
  }
}
