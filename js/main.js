const apiUrl = 'http://localhost:3000/contacts';

    function addContact() {
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const phoneNumber = document.getElementById('phoneNumber').value;
      const photo = document.getElementById('photo').value;

      

      if (!firstName || !lastName || !phoneNumber || !photo) {
        alert('Fill in all the fields');
        return;
      }else{
        alert('Successfully added!')
      }


      const contact = {
        firstName,
        lastName,
        phoneNumber,
        photo,
      };

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Contact added:', data);
        document.getElementById('contactForm').reset();
        loadContacts();
      });
    }

    function loadContacts() {
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const contactList = document.getElementById('contactList');
        contactList.innerHTML = '';

        data.forEach(contact => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<div class="third">
            <strong>${contact.firstName} ${contact.lastName}</strong><br>
            ${contact.phoneNumber}<br><br>
            <img src="${contact.photo}" alt="${contact.firstName} ${contact.lastName}" width="100">
            <button class="second-container" onclick="editContact(${contact.id})">Edit</button>
            <button class="second-container" onclick="deleteContact(${contact.id})">Delete</button>
            </div> `;
          contactList.appendChild(listItem);
        });
      });
    }

    function editContact(id) {

      fetch(`${apiUrl}/${id}`)
      .then(response => response.json())
      .then(contact => {
  
        document.getElementById('firstName').value = contact.firstName;
        document.getElementById('lastName').value = contact.lastName;
        document.getElementById('phoneNumber').value = contact.phoneNumber;
        document.getElementById('photo').value = contact.photo;

       
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = () => updateContact(id);
        document.getElementById('contactForm').appendChild(updateButton);
      });
    }

    function updateContact(id) {
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const phoneNumber = document.getElementById('phoneNumber').value;
      const photo = document.getElementById('photo').value;

      const updatedContact = {
        firstName,
        lastName,
        phoneNumber,
        photo,
      };


      
      fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Contact updated:', data);
        document.getElementById('contactForm').reset();
     
        document.getElementById('contactForm').lastChild.remove();
        loadContacts();
      });
    }

  


    function deleteContact(id) {
      fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        console.log('Contact deleted:', data);
        loadContacts();
      });
    }

    loadContacts();
   


    