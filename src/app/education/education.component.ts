import { Component } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent {
  degrees = [
    {
      title: 'Certificate in Advanced English',
      desc: 'Certificado en Ingles emitido por Cambridge para el nivel C1.',
      image: 'assets/img/cambridge.jpg',
    },
    {
      title: 'Javascript Profesional',
      desc: 'Certificacion en javascript profesional emitida por Platzi.',
      image: 'assets/img/cambridge.jpg',
    },
  ];
}
