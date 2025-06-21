const form = document.getElementById("guest-form");
const input = document.getElementById("guest-name");
const categorySelect = document.getElementById("guest-category");
const guestList = document.getElementById("guest-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (guestList.children.length >= 10) {
    alert("Guest list full! Maximum 10 people.");
    return;
  }

  const name = input.value.trim();
  const category = categorySelect.value;
  const timestamp = new Date().toLocaleString();

  const li = document.createElement("li");
  li.classList.add(category);

  const nameSpan = document.createElement("span");
  nameSpan.textContent = name + " - " + category;

  const timeSpan = document.createElement("span");
  timeSpan.textContent = ` | Added: ${timestamp}`;
  timeSpan.className = "timestamp";

  const rsvpButton = document.createElement("button");
  rsvpButton.textContent = "RSVP: Not Attending";
  rsvpButton.addEventListener("click", () => {
    rsvpButton.textContent =
      rsvpButton.textContent === "RSVP: Attending"
        ? "RSVP: Not Attending"
        : "RSVP: Attending";
  });

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    const newName = prompt("Enter new name:", name);
    if (newName) {
      nameSpan.textContent = newName + " - " + category;
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove";
  deleteButton.addEventListener("click", () => li.remove());

  li.append(nameSpan, timeSpan, rsvpButton, editButton, deleteButton);
  guestList.appendChild(li);

  form.reset();
});