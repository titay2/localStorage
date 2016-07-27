/* global localStorage */
var contactAPI = {}
contactAPI.load = function () {
  return JSON.parse(localStorage.getItem('contacts') || '[]')
}
contactAPI.add = function (contact) {
  var contacts = contactAPI.load()

  contact.id = Math.random().toString(36).substr(2, 7)
  contacts.push(contact)
  localStorage.setItem('contacts', JSON.stringify(contacts))

  return contact
}
contactAPI.update = function (id, properties) {
  var contacts = contactAPI.load()
  contacts = contacts.map(function (contact) {
    if (id === contact.id) {
      properties.id = id
      return properties
    }

    return contact
  })

  localStorage.setItem('contacts', JSON.stringify(contacts))
}
contactAPI.delete = function (id) {
  var contacts = contactAPI.load()
  contacts = contacts.filter(function (contact) {
    return id !== contact.id
  })

  localStorage.setItem('contacts', JSON.stringify(contacts))
}
