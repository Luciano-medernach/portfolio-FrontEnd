import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProyectService } from '../services/proyect.service';
import { Proyect } from '../shared/proyect.model';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css'],
})
export class ProyectsComponent {
  constructor(private proyectService: ProyectService) {}

  proyects: Array<Proyect> = [];

  state = 'add';

  proyectForm = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.minLength(10)]),
    date: new FormControl(2000, [Validators.required]),
  });

  get id() {
    return this.proyectForm.get('id');
  }
  get title() {
    return this.proyectForm.get('title');
  }
  get description() {
    return this.proyectForm.get('description');
  }
  get date() {
    return this.proyectForm.get('date');
  }

  clearModal() {
    this.proyectForm.reset();
    this.state = 'add';
  }

  setModal(proyect: any) {
    this.proyectForm.setValue(proyect);
    this.state = 'edit';
  }

  onSubmit() {
    if (this.state == 'add') {
      this.saveProyect();
    } else {
      this.editProyect();
    }
  }

  getProyects() {
    this.proyectService
      .getProyects()
      .subscribe((data: Array<Proyect>) => (this.proyects = data));
  }

  saveProyect() {
    const proyect: any = this.proyectForm.value;

    this.proyectService.saveProyect(proyect).subscribe((data: any) => {
      this.proyects.push(data);
    });
  }

  editProyect() {
    const proyect: any = this.proyectForm.value;

    this.proyectService.editProyect(proyect).subscribe(() => {
      this.getProyects();
    });
  }

  deleteProyect(id: any) {
    this.proyectService.deleteProyect(id).subscribe(() => {
      this.getProyects();
    });
  }

  ngOnInit() {
    this.getProyects();
  }
}
