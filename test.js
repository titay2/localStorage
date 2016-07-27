/* global contactAPI */
var form = document.querySelector('#input-name')
var table = document.querySelector('#mytable')

var contacts = contactAPI.load()
contacts.forEach(function (contact) {
  var $row = document.createElement('tr')
  $row.dataset.id = contact.id
  $row.innerHTML = `
    <td>
      ${contact.name}
    </td>
    <td colspan="3">
      ${contact.contact || '-'}
    </td>
    <td>
      ${contact.note || '-'}
    </td>
    <td class="actions">
      <a href="#" data-action="edit">edit</a> |
      <a href="#" data-action="delete">delete</a>
    </td>
  `
  table.appendChild($row)
})
form.addEventListener('submit', function (event) {
  event.preventDefault()
  save()
})

function save () {
  var name = document.querySelector('#textfield').value

  if (name) {
    var contact = contactAPI.add({
      name: name
    })
    var newrow = document.createElement('tr')
    newrow.dataset.id = contact.id
    newrow.innerHTML = `<tr>
    <td> ${name} </td>
    <td colspan="3">
      -
    </td >
    <td>
      -
    </td>
    <td class="actions">
      <a href="#" data-action="edit">Edit</a> |
      <a href="#" data-action="delete">Delete</a>
    </td>
    </tr>
    `

    table.appendChild(newrow)
    form.reset()
  }
}

table.addEventListener('click', function (event) {
  event.preventDefault()

  var clickedbtn = event.target
  var row = clickedbtn.closest('tr')
  var action = clickedbtn.dataset.action
  var name
  var contact
  var note

  if (action === 'delete') {
    contactAPI.delete(row.dataset.id)
    row.remove()
  }
  if (action === 'edit') {
    var edit_row = row.querySelectorAll('td')

    name = edit_row[0].textContent.trim()
    contact = edit_row[1].textContent.trim()
    note = edit_row[2].textContent.trim()
    row.innerHTML = `
      <td>
        <input value="${name}"  data-original="${name}">
      </td>
      <td>
        <input value="${contact}" Colspan="3" data-original="${contact}">
      </td>
      <td>
        <textarea data-original="${note}">${note}</textarea>
      </td>
      <td class="actions">
        <button data-action="save">save</button>
        <a href="#" data-action="cancel">cancel</a>
      </td>`
  }
  if (action === 'save') {
    var $inputs = row.querySelectorAll('input, textarea')
    var contactstring = $inputs[1].value
    name = $inputs[0].value
    note = $inputs[2].value

    row.innerHTML = `
      <td >
        ${name}
      </td>
      <td Colspan="3">
        ${contactstring}
      </td>
      <td>
        ${note}
      </td>
      <td class="actions">
        <a href="#" data-action="edit">edit</a> |
        <a href="#" data-action="delete">delete</a>
      </td>
    `

    contactAPI.update(row.dataset.id, {
      name: name,
      contact: contactstring,
      note: note
    })
  }

  if (action === 'cancel') {
    $inputs = row.querySelectorAll('input, textarea')
    name = $inputs[0].dataset.original
    contact = $inputs[1].dataset.original
    note = $inputs[2].dataset.original

    row.innerHTML = `
      <td >
        ${name}
      </td>
      <td colspan="3">
        ${contact}
      </td>
      <td>
        ${note}
      </td>
      <td class="actions">
        <a href="#" data-action="edit">edit</a> |
        <a href="#" data-action="delete">delete</a>
      </td>
    `
  }
})
