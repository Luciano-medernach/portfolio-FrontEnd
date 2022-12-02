import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent {
  name = 'Luciano Maidana Medernach';
  title = 'Full Stack Developer JR.';
  info =
    'Soy tecnico en programacion y desarrollador fullstack. Actualmente estudiante de ingenieria en sistemas.';
}
