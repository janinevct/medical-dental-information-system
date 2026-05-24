const API = 'http://localhost:3000/api';

let patients = [];
let nextId = 1;

//  SIDEBAR NAVIGATION

function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  document.getElementById('section-' + name).classList.add('active');
  document.querySelector(`[data-section="${name}"]`).classList.add('active');

  // load data for that section
  if (name === 'patients')         loadPatients();
  if (name === 'appointments')     loadAppointments();
  if (name === 'visits')           loadVisits();
  if (name === 'history')          loadHistory();
  if (name === 'services')         loadServices();
  if (name === 'dental')           loadDental();
  if (name === 'medical')          loadMedical();
  if (name === 'patient_services') loadPatientServices();
}

// PATIENTS (full CRUD) 
async function loadPatients() {
  const res  = await fetch(`${API}/patients`);
  const json = await res.json();
  patients = json.data || [];
  buildAddressFilter();
  applyFilters();
}

function buildAddressFilter() {
  const select = document.getElementById('filterAddress');
  const addresses = [...new Set(patients.map(p => p.Address).filter(Boolean))];
  select.innerHTML = '<option value="">All Addresses</option>';
  addresses.forEach(addr => {
    const opt = document.createElement('option');
    opt.value = opt.textContent = addr;
    select.appendChild(opt);
  });
}

function applyFilters() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const gender  = document.getElementById('filterGender').value;
  const address = document.getElementById('filterAddress').value;

  const filtered = patients.filter(p => {
    const matchesSearch =
      String(p.PatientID).includes(keyword) ||
      `p-${String(p.PatientID).padStart(3, '0')}`.includes(keyword.toLowerCase()) ||
      p.FirstName.toLowerCase().includes(keyword) ||
      p.LastName.toLowerCase().includes(keyword) ||
      (p.ContactNumber || '').toLowerCase().includes(keyword);
    const matchesGender  = gender  === '' || p.Gender  === gender;
    const matchesAddress = address === '' || p.Address === address;
    return matchesSearch && matchesGender && matchesAddress;
  });

  renderTable(filtered);
}

function renderTable(list) {
  const tbody     = document.getElementById('tableBody');
  const noResults = document.getElementById('noResults');
  tbody.innerHTML = '';

  if (list.length === 0) { noResults.style.display = 'block'; return; }
  noResults.style.display = 'none';

  list.forEach((p, i) => {
    const badge = p.Gender
      ? `<span class="badge-${p.Gender === 'Male' ? 'male' : 'female'}">${p.Gender}</span>`
      : '—';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>P-${String(p.PatientID).padStart(3, '0')}</td>
      <td>${p.FirstName}</td>
      <td>${p.LastName}</td>
      <td>${badge}</td>
      <td>${p.Address || '—'}</td>
      <td>${p.ContactNumber || '—'}</td>
      <td>
        <button class="btn-edit" onclick="openEditModal(${p.PatientID})">Edit</button>
        <button class="btn-del"  onclick="openDeleteModal(${p.PatientID}, '${p.FirstName} ${p.LastName}')">Delete</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

// MODALS
function openAddModal() {
  ['add_firstname','add_lastname','add_contact','add_address'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('add_gender').value = '';
  document.getElementById('addModal').style.display = 'flex';
}

function openEditModal(id) {
  const p = patients.find(p => p.PatientID === id);
  if (!p) return;
  document.getElementById('edit_id').value        = p.PatientID;
  document.getElementById('edit_firstname').value = p.FirstName;
  document.getElementById('edit_lastname').value  = p.LastName;
  document.getElementById('edit_gender').value    = p.Gender;
  document.getElementById('edit_contact').value   = p.ContactNumber;
  document.getElementById('edit_address').value   = p.Address;
  document.getElementById('editModal').style.display = 'flex';
}

function openDeleteModal(id, fullname) {
  document.getElementById('delete_id').value              = id;
  document.getElementById('delete_name_label').textContent = fullname;
  document.getElementById('deleteModal').style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// ADD
async function addPatient() {
  const firstname = document.getElementById('add_firstname').value.trim();
  const lastname  = document.getElementById('add_lastname').value.trim();
  const gender    = document.getElementById('add_gender').value;
  const contact   = document.getElementById('add_contact').value.trim();
  const address   = document.getElementById('add_address').value.trim();

  if (!firstname || !lastname) { alert('Please enter both first name and last name.'); return; }
  if (!firstname) { alert('First name is required.'); return; }
  if (!lastname) { alert('Last name is required.'); return; }
  if (!gender) { alert('Please select a gender.'); return; }
  if (!contact) { alert('Contact number is required.'); return; }
  if (!address) { alert('Address is required.'); return; }
  if (!confirm(`Create record for ${firstname} ${lastname}?`)) return;

  await fetch(`${API}/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ FirstName: firstname, LastName: lastname, Gender: gender, Address: address, ContactNumber: contact })
  });

  closeModal('addModal');
  await loadPatients();
}

// EDIT
async function saveEdit() {
  const id        = parseInt(document.getElementById('edit_id').value);
  const firstname = document.getElementById('edit_firstname').value.trim();
  const lastname  = document.getElementById('edit_lastname').value.trim();
  const gender    = document.getElementById('edit_gender').value;
  const contact   = document.getElementById('edit_contact').value.trim();
  const address   = document.getElementById('edit_address').value.trim();

  if (!firstname || !lastname) { alert("First name and last name can't be empty."); return; }
  if (!confirm(`Update record for ${firstname} ${lastname}?`)) return;

  await fetch(`${API}/patients/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ FirstName: firstname, LastName: lastname, Gender: gender, Address: address, ContactNumber: contact })
  });

  closeModal('editModal');
  await loadPatients();
}

// DELETE
async function confirmDelete() {
  const id = parseInt(document.getElementById('delete_id').value);
  await fetch(`${API}/patients/${id}`, { method: 'DELETE' });
  closeModal('deleteModal');
  await loadPatients();
}

// close on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.style.display = 'none';
  });
});

// APPOINTMENTS 

async function loadAppointments() {
  const res  = await fetch(`${API}/appointments`);
  const json = await res.json();
  const list = json.data || [];
  const tbody = document.getElementById('appointmentsBody');
  const noEl  = document.getElementById('noAppointments');
  tbody.innerHTML = '';

  if (list.length === 0) { noEl.style.display = 'block'; return; }
  noEl.style.display = 'none';

  list.forEach(a => {
    const statusClass =
      a.Status === 'Scheduled' ? 'badge-scheduled' :
      a.Status === 'Completed' ? 'badge-completed'  : 'badge-pending';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${a.AppointmentID}</td>
      <td>${a.PatientName || a.PatientID}</td>
      <td>${a.AppointmentDate || '—'}</td>
      <td>${a.AppointmentTime || '—'}</td>
      <td>${a.Purpose || '—'}</td>
      <td><span class="badge-status ${statusClass}">${a.Status || '—'}</span></td>`;
    tbody.appendChild(tr);
  });
}

// VISITS

async function loadVisits() {
  const res  = await fetch(`${API}/visits`);
  const json = await res.json();
  const list = json.data || [];
  const tbody = document.getElementById('visitsBody');
  const noEl  = document.getElementById('noVisits');
  tbody.innerHTML = '';

  if (list.length === 0) { noEl.style.display = 'block'; return; }
  noEl.style.display = 'none';

  list.forEach(v => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${v.VisitID}</td>
      <td>${v.PatientName || v.PatientID}</td>
      <td>${v.VisitDate || '—'}</td>
      <td>${v.VisitTime || '—'}</td>
      <td>${v.VisitRemarks || '—'}</td>`;
    tbody.appendChild(tr);
  });
}

//  PATIENT HISTORY 

async function loadHistory() {
  const res  = await fetch(`${API}/history`);
  const json = await res.json();
  const list = json.data || [];
  const tbody = document.getElementById('historyBody');
  const noEl  = document.getElementById('noHistory');
  tbody.innerHTML = '';

  if (list.length === 0) { noEl.style.display = 'block'; return; }
  noEl.style.display = 'none';

  list.forEach(h => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${h.HistoryID}</td>
      <td>${h.PatientName || h.PatientID}</td>
      <td>${h.HistoryDetails || '—'}</td>
      <td>${h.DateRecorded || '—'}</td>`;
    tbody.appendChild(tr);
  });
}

// SERVICES 

async function loadServices() {
  const res  = await fetch(`${API}/services`);
  const json = await res.json();
  const list = json.data || [];
  const tbody = document.getElementById('servicesBody');
  const noEl  = document.getElementById('noServices');
  tbody.innerHTML = '';

  if (list.length === 0) { noEl.style.display = 'block'; return; }
  noEl.style.display = 'none';

  list.forEach(s => {
    const typeClass = s.ServiceType === 'Medical' ? 'badge-medical' : 'badge-dental';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${s.ServiceID}</td>
      <td>${s.ServiceName || '—'}</td>
      <td><span class="badge-status ${typeClass}">${s.ServiceType || '—'}</span></td>
      <td>${s.Description || '—'}</td>`;
    tbody.appendChild(tr);
  });
}

//DENTAL 

async function loadDental() {
  const res  = await fetch(`${API}/dental`);
  const json = await res.json();
  const list = json.data || [];
  const tbody = document.getElementById('dentalBody');
  const noEl  = document.getElementById('noDental');
  tbody.innerHTML = '';

  if (list.length === 0) { noEl.style.display = 'block'; return; }
  noEl.style.display = 'none';

  list.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${d.ServiceID}</td>
      <td>${d.ToothArea || '—'}</td>
      <td>${d.DentalProcedure || '—'}</td>`;
    tbody.appendChild(tr);
  });
}

// MEDICAL

async function loadMedical() {
  const res  = await fetch(`${API}/medical`);
  const json = await res.json();
  const list = json.data || [];
  const tbody = document.getElementById('medicalBody');
  const noEl  = document.getElementById('noMedical');
  tbody.innerHTML = '';

  if (list.length === 0) { noEl.style.display = 'block'; return; }
  noEl.style.display = 'none';

  list.forEach(m => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${m.ServiceID}</td>
      <td>${m.MedicalSpecialty || '—'}</td>
      <td>${m.ReferringDoctor || '—'}</td>`;
    tbody.appendChild(tr);
  });
}

// PATIENT SERVICES 

async function loadPatientServices() {
  const res  = await fetch(`${API}/patient-services`);
  const json = await res.json();
  const list = json.data || [];
  const tbody = document.getElementById('patientServicesBody');
  const noEl  = document.getElementById('noPatientServices');
  tbody.innerHTML = '';

  if (list.length === 0) { noEl.style.display = 'block'; return; }
  noEl.style.display = 'none';

  list.forEach(ps => {
    const statusClass =
      ps.Status === 'Completed' ? 'badge-completed' :
      ps.Status === 'Scheduled' ? 'badge-scheduled' : 'badge-pending';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${ps.PatientName || ps.PatientID}</td>
      <td>${ps.ServiceName || ps.ServiceID}</td>
      <td>${ps.DateAvailed || '—'}</td>
      <td><span class="badge-status ${statusClass}">${ps.Status || '—'}</span></td>`;
    tbody.appendChild(tr);
  });
}

// INIT 
loadPatients();
