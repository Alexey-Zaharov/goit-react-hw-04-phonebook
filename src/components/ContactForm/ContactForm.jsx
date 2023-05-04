import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const ContactForm = ({ stateChange }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'number':
        setNumber(event.target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const nameData = {
      name: event.currentTarget.elements.name.value,
      id: nanoid(),
      number: event.currentTarget.elements.number.value.toString(),
    };
    stateChange(nameData);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <div className={css.contactForm}>
      <form onSubmit={handleSubmit}>
        <label className={css.contactLable}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            className={css.contactInput}
            value={name}
            onChange={handleChange}
          />
        </label>
        <label className={css.contactLable}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            className={css.contactInput}
            value={number}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  stateChange: PropTypes.func.isRequired,
};

export default ContactForm;
