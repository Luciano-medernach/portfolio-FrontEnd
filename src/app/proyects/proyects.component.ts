import { Component } from '@angular/core';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css'],
})
export class ProyectsComponent {
  proyects = [
    {
      title: 'Midnight Ride',
      desc: 'Juego RPG de terror creado en Unity.',
      date: 'Abril 2022 - Noviembre 2022',
      image: 'assets/img/MidnightRide.jpg',
    },
  ];
}
