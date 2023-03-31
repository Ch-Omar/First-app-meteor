import React from "react";
import { ContactsCollection } from "../api/ContactsCollection";
import { useTracker } from "meteor/react-meteor-data";

export const ContactList = () => {
  const contacts = useTracker(() => {
    return ContactsCollection.find({}, { sort: { createdAt: -1 } }).fetch();
  });
  const removeContact = (event,_id) => {
    event.preventDefault();
    Meteor.call('contacts.remove', {contactId: _id})
  };
  return (
    <>
      <h2>Contact List</h2>
      <ul className="col-sm-3">
        {contacts.map((contact) => (
          <li className="d-flex justify-content-between" style={{padding:"10px"}} key={contact._id}>
            <p>{contact.name}</p>
            <button onClick={(event) => removeContact(event,contact._id)} class="btn btn-danger">X</button>
            </li>
        ))}
      </ul>
    </>
  );
};
