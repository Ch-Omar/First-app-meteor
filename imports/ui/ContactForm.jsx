import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
// import { ContactsCollection } from '../api/ContactsCollection';

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const showError = ({ message }) => {
    setError(message);
    setSuccess("");
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const showSuccess = ({ message }) => {
    setSuccess(message);
    setError("");
    setTimeout(() => {
      setSuccess("");
    }, 5000);
  };

  const saveContact = () => {
    //ContactsCollection.insert({name})
    Meteor.call("contacts.insert", { name }, (errorResponse) => {
      if (errorResponse) {
        showError({ message: errorResponse.error });
      } else {
        setName("");
        showSuccess({ message: "Contact saved." });
      }
    });
  };

  return (
    <form>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "#008000" }}>{success}</p>}
        <label htmlFor="name" style={{paddingRight:"10px"}}>Name</label>
        <input
          id="name"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <button type="button" onClick={saveContact}>
          Save Contact
        </button>
      </div>
    </form>
  );
};
