import React, { memo, useState } from "react";
import { ContactsCollection } from "../api/ContactsCollection";
import { useSubscribe, useFind } from "meteor/react-meteor-data";

export const ContactList = () => {
  const [deleted, setDeleted] = useState("");

  const showDeleted = ({ message }) => {
    setDeleted(message);
    setTimeout(() => {
      setDeleted("");
    }, 5000);
  };


  const isloading = useSubscribe("allContacts");
  const contacts = useFind(() =>
    ContactsCollection.find({}, { sort: { createdAt: -1 } })
  );
  const removeContact = (event, _id) => {
    event.preventDefault();
    Meteor.call("contacts.remove", { contactId: _id });
    setDeleted('Contact deleted')
    etTimeout(() => {
      setDeleted("");
    }, 5000);
  };

  if (isloading()) {
    return <h2>Loading</h2>;
  }

  const ContactItem = memo(({ contact }) => {
    return (
      <li
        className="d-flex justify-content-between"
        style={{ padding: "10px" }}
      >
        <p>{contact.name}</p>
        <button
          onClick={(event) => removeContact(event, contact._id)}
          className="btn btn-danger"
        >
          X
        </button>
      </li>
    );
  });

  return (
    <>
      {deleted && <p style={{ color: "red" }}>{deleted}</p>}

      <h2>Contact List</h2>
      <ul className="col-sm-3">
        {contacts.map((contact) => (
          <ContactItem key={contact._id} contact={contact} />
        ))}
      </ul>
    </>
  );
};
