
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function fetchContacts() {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  };

async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts)
    return console.table(parsedContacts);
  };

async function getContactById(contactId) {
    const contacts = await fetchContacts();
    const contact = contacts.find((contact)=> contact.id === contactId);
    return console.log(contact);
  };
  
async function removeContact(contactId) {
    const contacts = await fetchContacts();
    const contactRemove = contacts.filter((contact)=> contact.id !== contactId)
    const parsedContactsRemove = JSON.stringify(contactRemove);
    await fs.writeFile(contactsPath, parsedContactsRemove);
    return listContacts();
  };
  
async function addContact(name, email, phone) {
    const contacts = await fetchContacts();
    const contactAdd = { id: `${contacts.length + 1}`, name, email, phone };
    const contactsAdded = [...contacts, contactAdd];
    const parsedContactsAdded = JSON.stringify(contactsAdded);
    await fs.writeFile(contactsPath, parsedContactsAdded);
    return listContacts();
  };

  module.exports ={
    listContacts,
    getContactById,
    removeContact,
    addContact
  };