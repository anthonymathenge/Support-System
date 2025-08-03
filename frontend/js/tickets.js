

const ticketForm = document.getElementById("ticketForm");
const ticketTable = document.querySelector("#ticketTable tbody");
const apiBase = "http://localhost:8080/api/tickets";
const userEmail = localStorage.getItem("userEmail");


let userId = 1; 

// Create a new ticket
if (ticketForm) {
  ticketForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(ticketForm);
    const ticket = {
      title: formData.get("title"),
      description: formData.get("description"),
      priority: formData.get("priority"),
    };

    const res = await fetch(`${apiBase}/create/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });

    if (res.ok) {
      loadTickets();
      ticketForm.reset();
    } else {
      alert("Failed to create ticket.");
    }
  });
}

// Load tickets 
async function loadTickets() {
  const res = await fetch(`${apiBase}/user/${userId}`);
  if (!res.ok) return;

  const tickets = await res.json();
  ticketTable.innerHTML = "";

  tickets.forEach((ticket) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${ticket.title}</td>
      <td>${ticket.description}</td>
      <td>${ticket.status}</td>
      <td>${ticket.priority}</td>
      <td>
        <button onclick="deleteTicket(${ticket.id})">Delete</button>
      </td>
    `;

    ticketTable.appendChild(row);
  });
}

// Delete a ticket
async function deleteTicket(ticketId) {
  const res = await fetch(`${apiBase}/delete/${ticketId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    loadTickets();
  } else {
    alert("Failed to delete ticket.");
  }
}

if (ticketTable) {
  loadTickets();
}
