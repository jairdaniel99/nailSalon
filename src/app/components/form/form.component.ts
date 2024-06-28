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
      name: 'service 1',
      description: 'description 1',
      addons: ['addon 1', 'addon 2'],
    },
    {
      id: 2,
      name: 'service 2',
      description: 'description 2',
      addons: ['addon 3', 'addon 4'],
    },
  ];
  selectedAddons: string[] = [];

  serviceChanged(event: any) {
    console.log(event.target.value);
    const selectedService = this.services.find(
      (service) => service.id == event.target.value
    );
    this.selectedAddons = selectedService ? selectedService.addons : [];
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
