//------------------------------------- 
//  MAIN VARIABLES
//-------------------------------------
let search = document.getElementById('search-input');

const employees = [];
const employeeBox = document.getElementsByClassName('employee-box');
const modal = document.getElementsByClassName('modal-container')[0];

const previousEmployee = document.getElementsByClassName('left-arrow-btn'[0]);
const nextEmployee = document.getElementsByClassName('right-arrow-btn')[0];

const url = 'https://randomuser.me/api/?results=12&nat=gb,us,es';

//------------------------------------- 
//  FETCH FUNCTIONS
//-------------------------------------

fetch(url)
    .then((response) => response.json())
    .then(createEmployee)

//------------------------------------- 
//  HELPER FUNCTIONS
//-------------------------------------

//Function creates iterates through the Json data from the Api & adds HTML with employee details to the dom//
function createEmployee(data) {

      for(let i=0; i < data.results.length; i++) {

        employees.push(data.results[i]);
        employeeBox[i].innerHTML =   
        
            `<div class ="card">
            <div class="image-box">
                <img src="${data.results[i].picture.medium}" alt="">
            </div>
            <div class="employee-info">
                <h2 class="employee-name">${data.results[i].name.first} ${data.results[i].name.last}</h2>
                <p>${data.results[i].email}<p>
                <p>${data.results[i].location.city}</p>
            </div>
            </div>`; 
      }  

      document.querySelectorAll('.card').forEach((card, index) => {
        card.addEventListener('click', (event) => {
            employeeModal(employees[index], index);

        });

      });

    }

//------------------------------------- 
// Employee Modal Popup
//-------------------------------------
    function employeeModal(employee, index) {

        // Formats date depending on users locale.
        const dob = new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language); 

       modal.innerHTML = 
       `
       <div class="modal-content" data-index="${index}">
        <span class="close-button">&times;</span>
        <img src="${employee.picture.large}" alt="">
        <h2>${employee.name.first} ${employee.name.last}</h2>
        <p>${employee.email}</p>
        <p>${employee.location.city}</p>
        <span class="left-arrow-btn">&#8678;</span>
        <span class="right-arrow-btn">&#8680;</span>
        <p>${employee.cell}</p>
        <address>${employee.location.street.number}, ${employee.location.street.name}, 
        ${employee.location.city}, ${employee.location.state}, 
        ${employee.location.postcode}</address>
        <p>${dob}</p> 
       </div>`;

       modal.style.display = 'block';

    //Event Listener to Cancel Modal When User Clicks "X"
    const modalCancel = document.getElementsByClassName('close-button')[0];

    modalCancel.addEventListener('click', () => {
        modal.style.display = 'none';
    })

}

//Event Listener To Move to next or previous employee
modal.addEventListener('click', (event) => {
    if(event.target.className === 'right-arrow-btn'){
        let indexPosition = parseInt(modal.firstElementChild.getAttribute('data-index'));
        indexPosition += 1;
        if (indexPosition < 12) {
            employeeModal(employees[indexPosition], indexPosition);
        }
    }
    if(event.target.className === 'left-arrow-btn'){
        let indexPosition = parseInt(modal.firstElementChild.getAttribute('data-index'));
        indexPosition -= 1;
        if (indexPosition > -1) {
            employeeModal(employees[indexPosition], indexPosition);
        }
    }
})


//------------------------------------- 
// Employee Search Function
//-------------------------------------
let a = document.querySelectorAll('.employee-box');

search.addEventListener('keyup', () => {
    const input = search.value.toLowerCase();

    for (let i = 0; i < a.length; i += 1) {
        const attrData = a[i].innerHTML;
        if (attrData.toLowerCase().indexOf(input) > -1) {
            a[i].style.display = "";
            } else {
            a[i].style.display = "none";
            }
    }
});

search.addEventListener('search-input', () => {
    if (event.target.value === '') {
      for (let i = 0; i < a.length; i += 1) {
        a[i].style.display = "";
      }
    }
  });












