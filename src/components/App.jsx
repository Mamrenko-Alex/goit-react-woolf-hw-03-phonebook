import { nanoid } from 'nanoid';
import { Component } from 'react';
import styles from './PhoneBook.module.css';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { SearchFilter } from './SearchFilter';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    if (
      this.state.contacts.find(
        ({ name }) =>
          name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      filter: '',
    }));
  };

  deleteContact = deleteId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== deleteId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={styles.container}>
        <h1 className={styles.hero}>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2 className={styles.title}>Contacts</h2>
        <SearchFilter value={filter} onChange={this.handleChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
