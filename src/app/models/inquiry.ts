export class Inquiry {
  name: string;
  email: string;
  phone: number;
  service: string;
  addons: string;
  information: string;

  constructor(
    name: string,
    email: string,
    phone: number,
    service: string,
    addons: string,
    information: string
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.service = service;
    this.addons = addons;
    this.information = information;
  }
}
