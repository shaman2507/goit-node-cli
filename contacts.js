const fs = require('fs');
const { promises: fsPromises } = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

async function listContacts() {
  try {
    const data = await fsPromises.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter(contact => contact.id !== contactId);

  if (contacts.length === updatedContacts.length) {
    return null;
  }

  await fsPromises.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return contacts.find(contact => contact.id === contactId) || null;
}

async function addContact(name, email, phone) {
  const newContact = {
    id: Date.now(),
    name,
    email,
    phone,
  };

  const contacts = await listContacts();
  const updatedContacts = [...contacts, newContact];

  await fsPromises.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
