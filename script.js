// Define an array to store the enrolled students' data
let studentsData = [];

// Function to handle form submission
const handleFormSubmit = (event) => {
  event.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const imageInput = document.getElementById('image'); // Get the file input element
  const imageFile = imageInput.files[0]; // Get the selected image file
  const website = document.getElementById('website').value;
  const gender = document.querySelector('input[name="male-female"]:checked').value;

  // Get selected skills
  const skills = [...document.querySelectorAll('.checkbox:checked')].map((item) => item.value);

  // Create a new student object
  const newStudent = {
    name,
    email,
    imageFile, // Store the image file for further processing
    website,
    gender,
    skills,
  };

  // Add the new student to the array
  studentsData.push(newStudent);

  // Clear the form fields
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  imageInput.value = ''; // Clear the image input
  document.getElementById('website').value = '';
  document.querySelector('input[name="male-female"]:checked').checked = false;
  document.querySelectorAll('.checkbox:checked').forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Display the enrolled students' data
  showData();
};

// Function to display enrolled students' data
const showData = () => {
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = '';

  studentsData.forEach((student, index) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const profileImg = document.createElement('img');
    profileImg.setAttribute('src', URL.createObjectURL(student.imageFile)); // Create a URL for the uploaded image
    profileImg.setAttribute('alt', 'Profile Picture');
    card.appendChild(profileImg);

    const info = document.createElement('div');
    info.classList.add('info');

    const name = document.createElement('p');
    name.innerHTML = `<strong>Name</strong>: ${student.name}`;
    info.appendChild(name);

    const gender = document.createElement('p');
    gender.innerHTML = `<strong>Gender</strong>: ${student.gender}`;
    info.appendChild(gender);

    const email = document.createElement('p');
    email.innerHTML = `<strong>Email</strong>: ${student.email}`;
    info.appendChild(email);

    const website = document.createElement('p');
    website.innerHTML = `<strong>Website</strong>: <a href="${student.website}" target="_blank">Click here</a>`;
    info.appendChild(website);

    const skills = document.createElement('p');
    skills.innerHTML = `<strong>Skills</strong>: ${student.skills.join(', ')}`;
    info.appendChild(skills);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', () => {
      deleteData(index);
    });
    info.appendChild(deleteBtn);

    card.appendChild(info);
    cardContainer.appendChild(card);
  });
};

// Function to delete a student's data
const deleteData = (index) => {
  studentsData.splice(index, 1);
  showData();
};

// Add event listeners
document.getElementById('submit').addEventListener('click', handleFormSubmit);
document.getElementById('reset').addEventListener('click', () => {
  studentsData = [];
  showData();
});

// Initial display of enrolled students' data
showData();