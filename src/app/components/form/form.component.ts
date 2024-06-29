import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  formStatus: any;
  services = [
    {
      id: 1,
      name: 'gel nails (new set)',
      description: '',
      addons: ['addon 1', 'addon 2'],
    },
    {
      id: 2,
      name: 'nail gel refill',
      description: '',
      addons: [],
    },
    {
      id: 3,
      name: 'nail polish*',
      description: '',
      addons: ['addon 3', 'addon 4'],
    },
    {
      id: 4,
      name: 'nail set removal',
      description: '',
      addons: ['addon 3', 'addon 4'],
    },
    {
      id: 5,
      name: 'polish removal',
      description: '',
      addons: ['addon 3', 'addon 4'],
    },
  ];
  selectedAddons: string[] = [];
  checkedAddons: string[] = [];

  serviceChanged(event: any) {
    console.log(event.target.value);
    const selectedService = this.services.find(
      (service) => service.id == event.target.value
    );
    this.selectedAddons = selectedService ? selectedService.addons : [];
    console.log(this.selectedAddons);
  }
  addonChanged(event: any) {
    if (
      event.target.checked &&
      !this.checkedAddons.includes(event.target.value)
    ) {
      this.checkedAddons.push(event.target.value);
    } else if (
      !event.target.checked &&
      this.checkedAddons.includes(event.target.value)
    ) {
      const foundAddon = this.checkedAddons.findIndex(
        (addon) => addon == event.target.value
      );
      this.checkedAddons.splice(foundAddon, 1);
    }
    console.log(this.checkedAddons);
  }
  sendEmail(contactForm: any) {
    console.log(contactForm.value);

    const templateParams = {
      name: contactForm.value.name,
      email: contactForm.value.email,
      information: contactForm.value.information,
      service_type: contactForm.value.service_type,
      addon_type: contactForm.value.addon_type,
    };

    emailjs
      .send(
        environment.emailjs.service_ID,
        environment.emailjs.template_ID,
        templateParams,
        {
          publicKey: environment.emailjs.public_key,
        }
      )
      .then(
        (response) => {
          this.formStatus = 'Thank you!';
        },
        (err) => {
          console.log('FAILED...', err);
        }
      );
  }
}
