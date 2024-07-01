import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../../../environment';
import { MyDataService } from '../../services/myData/my-data.service';
import { Inquiry } from '../../models/inquiry';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  formStatus: any;
  inquiries: any;
  constructor(
    private _inquiryService: MyDataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this._inquiryService.getInquiries().subscribe(
      (res) => (this.inquiries = res),
      (err) => console.log(err)
    );
  }
  services = [
    {
      id: 1,
      name: 'gel nails (new set)',
      description: '',
      addons: [],
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
      addons: ['hardening (dipping)', 'hardening (rubber)'],
    },
    {
      id: 4,
      name: 'nail set removal',
      description: '',
      addons: [],
    },
    {
      id: 5,
      name: 'polish removal',
      description: '',
      addons: [],
    },
  ];
  selectedAddons: any[] = [];
  checkedAddons: string[] = [];
  selectedService: any = '';

  serviceChanged(event: any) {
    console.log(event.target.value);
    const selectedService = this.services.find(
      (service) => service.id == event.target.value
    );
    this.selectedService = selectedService?.name;
    this.selectedAddons = selectedService ? selectedService.addons : [];
    console.log('selected service: ' + selectedService?.name);

    console.log('available add-ons: ' + this.selectedAddons);
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
      phone: contactForm.value.phone,
      service: this.selectedService,
      addons: this.checkedAddons,
      information: contactForm.value.information,
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
          console.log(this.formStatus);
        },
        (err) => {
          console.log('FAILED...', err);
        }
      );
    this._inquiryService.getInquiries();
    this._inquiryService.postInquiries(templateParams).subscribe(
      (response) => {
        console.log('posted to database!');
      },
      (error) => console.log("can't post to database.")
    );
  }
}
