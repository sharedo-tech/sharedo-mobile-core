class ContactUrlGenerator {
  constructor(contact) {
    this.__contact = contact;
  }

  generate() { }

  static getFor(contact) {
    switch (contact.contactTypeSystemName) {
      case "email": return new EmailUrlGenerator(contact);
      case "mobile":
      case "direct-line": return new PhoneUrlGenerator(contact);
      default: return null;
    }
  }
}

class EmailUrlGenerator extends ContactUrlGenerator {
  constructor(contact) {
    super(contact);
  }

  generate() {
    return `mailto:${this.__contact.contactValue}`
  }
}

class PhoneUrlGenerator extends ContactUrlGenerator {
  constructor(contact) {
    super(contact);
  }

  generate() {
    let number = this.__contact.contactValue.replace(/[^\d+]/g, "");

    if (number.startsWith("0")) {
      number = `+44 ${number.substr(1)}`;
    } else if (!number.startsWith("+")) {
      number = `+44 ${number}`;
    }

    return `tel:${number}`;
  }
}

export default ContactUrlGenerator