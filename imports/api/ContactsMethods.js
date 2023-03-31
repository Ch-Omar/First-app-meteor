import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ContactsCollection } from "./ContactsCollection";

Meteor.methods({
  "contacts.insert"({ name }) {
    check(name, String)
    if (!name) {
      throw new Meteor.Error("Name is required");
    }
    return ContactsCollection.insert({ name, createdAt: new Date() });
  },
  "contacts.remove"({ contactId }) {
    check(contactId, String)
    return ContactsCollection.remove(contactId);
  },
});
