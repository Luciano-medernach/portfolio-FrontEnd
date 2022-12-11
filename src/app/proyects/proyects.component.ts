import { Component } from '@angular/core';
import { ProyectService } from '../services/proyect.service';
import { Proyect } from '../shared/proyect.model';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css'],
})
export class ProyectsComponent {
  proyects: Array<Proyect> = [];

  constructor(private proyectService: ProyectService) {}

  getProyects() {
    this.proyectService
      .getProyects()
      .subscribe((data: Array<Proyect>) => (this.proyects = data));
  }

  ngOnInit() {
    this.getProyects();
  }
}
