import { useState, useEffect, useRef } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

const CONTACT_KEY = 'contact_item';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const initContacts = useRef(contacts);

  useEffect(() => {
    if (localStorage.getItem(CONTACT_KEY)) {
      setContacts(JSON.parse(localStorage.getItem(CONTACT_KEY)));
    }
  }, []);

  useEffect(() => {
    if (initContacts.current !== contacts) {
      localStorage.setItem(CONTACT_KEY, JSON.stringify(contacts));
    }
  }, [contacts]);

  const deleteContact = id => {
    setContacts(contact => contact.filter(contact => contact.id !== id));
  };

  const newContact = data => {
    contacts.some(
      contacts => contacts.name.toLowerCase() === data.name.toLowerCase()
    )
      ? window.alert(data.name + ' is already in contacts')
      : setContacts(contacts => [data, ...contacts]);
  };

  const handleFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const normolizedFiltredData = filter.toLowerCase();
  const filtredData = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normolizedFiltredData)
  );
  return (
    <>
      <h1>PhoneBook</h1>
      <ContactForm stateChange={newContact} />
      <h1>Contacts</h1>
      <Filter onFilter={handleFilter} filter={filter} />
      <ContactList data={filtredData} deleteContact={deleteContact} />
    </>
  );
};

export default App;
