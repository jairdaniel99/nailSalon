import { Component } from '@angular/core';
// import { servicesOffered } from '../../models/services';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  servicesOffered = [
    {
      id: 1,
      name: 'nail set',
      description: '',
      addons: [],
      price: '$50',
    },
    {
      id: 2,
      name: 'nail refill',
      description: 'gel or acrylic',
      addons: [],
      price: '$30',
    },
    {
      id: 3,
      name: 'nail polish',
      description: '',
      addons: ['hardening (dipping)', 'hardening (rubber)'],
      price: 'from $25',
    },
    {
      id: 4,
      name: 'nail set removal',
      description: '',
      addons: [],
      price: '$10',
    },
    {
      id: 5,
      name: 'polish removal',
      description: '',
      addons: [],
      price: '$5',
    },
  ];
}
