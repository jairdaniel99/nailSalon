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
  sendEmail(contactForm: any) {
    const templateParams = {
      name: contactForm.value.name,
      email: contactForm.value.email,
      information: contactForm.value.information,
      service_type: contactForm.value.service_type,
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
