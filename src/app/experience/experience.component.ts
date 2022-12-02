import { Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent {
  jobs = [
    {
      title: 'Administrador de bienes y recursos tecnologicos.',
      desc: 'Encargado de mantener un registro de salidas y entradas de distintos materiales necesarios para la elaboracion de proyectos en el establecimiento.',
      image: 'assets/img/cambridge.jpg',
    },
  ];
}
