// Sample patients matching the data  from our patient.sql database
let patients = [
  {
    PatientID: 1,
    FirstName: "Janine",
    LastName: "Decena",
    Gender: "Female",
    Address: "Legazpi City",
    ContactNumber: "09091122123"
  },
  {
    PatientID: 2,
    FirstName: "Xavier",
    LastName: "Garra",
    Gender: "Male",
    Address: "Legazpi City",
    ContactNumber: "09001122435"
  },
  {
    PatientID: 3,
    FirstName: "Sophia",
    LastName: "Moreno",
    Gender: "Female",
    Address: "Camarines Norte",
    ContactNumber: "09023122505"
  },
  {
    PatientID: 4,
    FirstName: "Alrich",
    LastName: "Perea",
    Gender: "Male",
    Address: "Legazpi City",
    ContactNumber: "09391132435"
  },
  {
    PatientID: 5,
    FirstName: "Jose",
    LastName: "Garcia",
    Gender: "Male",
    Address: "Sorsogon City",
    ContactNumber: "09216752435"
  }
];

let nextId = 6;


// ----- ADDRESS FILTER DROPDOWN -----
// this builds the address options automatically based on what's in the data
// so you don't have to manually type each city

function buildAddressFilter() {
  const select = document.getElementById("filterAddress");

  // get unique addresses only (no duplicates)
  const addresses = [...new Set(patients.map(function(p) { return p.Address; }))];

  // clear existing options except the first "All Addresses" one
  select.innerHTML = '<option value="">All Addresses</option>';

  addresses.forEach(function(addr) {
    const option = document.createElement("option");
    option.value = addr;
    option.textContent = addr;
    select.appendChild(option);
  });
}


// ----- SHOW TABLE -----

function renderTable(list) {
  const tbody = document.getElementById("tableBody");
  const noResults = document.getElementById("noResults");

  tbody.innerHTML = "";

  if (list.length === 0) {
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  list.forEach(function(p, index) {
    const row = document.createElement("tr");

    const genderBadge = p.Gender
      ? `<span class="${p.Gender === 'Male' ? 'badge-male' : 'badge-female'}">${p.Gender}</span>`
      : "—";

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${p.FirstName}</td>
      <td>${p.LastName}</td>
      <td>${genderBadge}</td>
      <td>${p.Address || "—"}</td>
      <td>${p.ContactNumber || "—"}</td>
      <td>
        <button class="btn-edit" onclick="openEditModal(${p.PatientID})">Edit</button>
        <button class="btn-del" onclick="openDeleteModal(${p.PatientID}, '${p.FirstName} ${p.LastName}')">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}


// ----- FILTERS + SEARCH (all in one function) -----
// this runs every time you type in the search bar OR change a filter dropdown

function applyFilters() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const gender = document.getElementById("filterGender").value;
  const address = document.getElementById("filterAddress").value;

  const filtered = patients.filter(function(p) {

    // check if search keyword matches name or contact
    const matchesSearch =
      p.FirstName.toLowerCase().includes(keyword) ||
      p.LastName.toLowerCase().includes(keyword) ||
      p.ContactNumber.toLowerCase().includes(keyword);

    // check if gender filter matches (empty means show all)
    const matchesGender = gender === "" || p.Gender === gender;

    // check if address filter matches (empty means show all)
    const matchesAddress = address === "" || p.Address === address;

    // patient only shows up if ALL three conditions are true
    return matchesSearch && matchesGender && matchesAddress;
  });

  renderTable(filtered);
}


// ----- MODALS -----

function openAddModal() {
  document.getElementById("add_firstname").value = "";
  document.getElementById("add_lastname").value = "";
  document.getElementById("add_gender").value = "";
  document.getElementById("add_contact").value = "";
  document.getElementById("add_address").value = "";
  document.getElementById("addModal").style.display = "flex";
}

function openEditModal(id) {
  const patient = patients.find(function(p) { return p.PatientID === id; });
  if (!patient) return;

  document.getElementById("edit_id").value = patient.PatientID;
  document.getElementById("edit_firstname").value = patient.FirstName;
  document.getElementById("edit_lastname").value = patient.LastName;
  document.getElementById("edit_gender").value = patient.Gender;
  document.getElementById("edit_contact").value = patient.ContactNumber;
  document.getElementById("edit_address").value = patient.Address;

  document.getElementById("editModal").style.display = "flex";
}

function openDeleteModal(id, fullname) {
  document.getElementById("delete_id").value = id;
  document.getElementById("delete_name_label").textContent = fullname;
  document.getElementById("deleteModal").style.display = "flex";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}


// ----- ADD PATIENT -----

function addPatient() {
  const firstname = document.getElementById("add_firstname").value.trim();
  const lastname = document.getElementById("add_lastname").value.trim();
  const gender = document.getElementById("add_gender").value;
  const contact = document.getElementById("add_contact").value.trim();
  const address = document.getElementById("add_address").value.trim();

  if (!firstname || !lastname) {
    alert("Please enter both first name and last name.");
    return;
  }

  const newPatient = {
    PatientID: nextId++,
    FirstName: firstname,
    LastName: lastname,
    Gender: gender,
    Address: address,
    ContactNumber: contact
  };

  patients.push(newPatient);
  closeModal("addModal");

  // rebuild address filter in case the new patient has a new city
  buildAddressFilter();
  applyFilters();

  // TODO later: replace the push above with a fetch() POST request to your backend
}


// ----- EDIT / SAVE CHANGES -----

function saveEdit() {
  const id = parseInt(document.getElementById("edit_id").value);
  const firstname = document.getElementById("edit_firstname").value.trim();
  const lastname = document.getElementById("edit_lastname").value.trim();
  const gender = document.getElementById("edit_gender").value;
  const contact = document.getElementById("edit_contact").value.trim();
  const address = document.getElementById("edit_address").value.trim();

  if (!firstname || !lastname) {
    alert("First name and last name can't be empty.");
    return;
  }

  const index = patients.findIndex(function(p) { return p.PatientID === id; });
  if (index === -1) return;

  patients[index].FirstName = firstname;
  patients[index].LastName = lastname;
  patients[index].Gender = gender;
  patients[index].ContactNumber = contact;
  patients[index].Address = address;

  closeModal("editModal");

  // rebuild address filter in case the address was changed
  buildAddressFilter();
  applyFilters();

  // TODO later: replace above with a fetch() PUT request to your backend
}


// ----- DELETE -----

function confirmDelete() {
  const id = parseInt(document.getElementById("delete_id").value);

  patients = patients.filter(function(p) { return p.PatientID !== id; });

  closeModal("deleteModal");

  // rebuild address filter in case deleted patient was the only one from that city
  buildAddressFilter();
  applyFilters();

  // TODO later: replace above with a fetch() DELETE request to your backend
}


// close modal if you click the dark overlay behind it
document.querySelectorAll(".modal-overlay").forEach(function(overlay) {
  overlay.addEventListener("click", function(e) {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
  });
});


// run when page first loads
buildAddressFilter();
renderTable(patients);