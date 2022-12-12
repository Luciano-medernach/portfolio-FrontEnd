import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PersonService } from '../services/person.service';
import { Person } from '../shared/person.model';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent {
  constructor(private personService: PersonService) {}

  person!: Person;

  personForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    info: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  get id() {
    return this.personForm.get('id');
  }

  get name() {
    return this.personForm.get('name');
  }

  get lastname() {
    return this.personForm.get('lastname');
  }

  get info() {
    return this.personForm.get('info');
  }

  setModal(person: any) {
    this.personForm.setValue(person);
  }

  getPerson() {
    this.personService.getPerson().subscribe((data: Person) => {
      this.person = data;
    });
  }

  editPerson() {
    const person: any = this.personForm.value;

    this.personService.editPerson(person).subscribe(() => {
      this.getPerson();
    });
  }

  ngOnInit(): void {
    this.getPerson();
  }
}
