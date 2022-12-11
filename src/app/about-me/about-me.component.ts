import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonService } from '../services/person.service';
import { Person } from '../shared/person.model';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent {
  information!: Person;

  constructor(private personService: PersonService) {}

  getPerson() {
    console.log('Aqui estamos');
    this.personService.getPerson().subscribe((data: Person) => {
      this.information = {
        name: data.name,
        lastname: data.lastname,
        title: data.title,
      };
    });
  }

  ngOnInit(): void {
    this.getPerson();
  }
}
