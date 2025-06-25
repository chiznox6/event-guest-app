//  references to DOM elements
const guestForm = document.getElementById('guest-form');
const guestNameInput = document.getElementById('guest-name');
const guestCategorySelect = document.getElementById('guest-category');
const guestList = document.getElementById('guest-list');
const guestCountDisplay = document.getElementById('guest-count');

// Guest state
let guests = [];
const MAX_GUESTS = 10;

// Utility: format current time
function formatTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Render all guests
function renderGuests() {
  guestList.innerHTML = '';
  guests.forEach((guest, index) => {
    const li = document.createElement('li');
    li.classList.add('guest', guest.category);

    const guestInfo = document.createElement('div');
    guestInfo.className = 'guest-info';
    guestInfo.innerHTML = `
      <p><strong>${guest.name}</strong> <span class="rsvp ${guest.attending ? 'attending' : 'not-attending'}">(${guest.attending ? 'Attending' : 'Not Attending'})</span></p>
      <small>${guest.category} • Added at ${guest.time}</small>
    `;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const rsvpBtn = document.createElement('button');
    rsvpBtn.textContent = 'Toggle RSVP';
    rsvpBtn.addEventListener('click', () => {
      guest.attending = !guest.attending;
      renderGuests();
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      const newName = prompt('Update guest name:', guest.name);
      if (newName && newName.trim() !== '') {
        guest.name = newName.trim();
        renderGuests();
      }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.addEventListener('click', () => {
      guests.splice(index, 1);
      renderGuests();
      updateCount();
    });

    actions.append(rsvpBtn, editBtn, deleteBtn);
    li.append(guestInfo, actions);
    guestList.appendChild(li);
  });
}

// Update the guest count display
function updateCount() {
  guestCountDisplay.textContent = `Guests: ${guests.length} / ${MAX_GUESTS}`;
}

// Handle form submission
guestForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page reload

  const name = guestNameInput.value.trim();
  const category = guestCategorySelect.value;

  if (!name) return;

  if (guests.length >= MAX_GUESTS) {
    alert('Guest list is full (10 guests max).');
    return;
  }

  const newGuest = {
    name,
    category,
    time: formatTime(),
    attending: true
  };

  guests.push(newGuest);
  guestForm.reset();
  renderGuests();
  updateCount();
});

// Initialize
updateCount();
