// Check Training Type and display adequate field
const trainingCheck = (selection) => {
  const distanceTravelledOpt = document.getElementById('distanceTravelled');
  const trainingTimeOpt = document.getElementById('trainingTime');
  let trainingType = selection.value;
  if (trainingType === 'endurance') {
    distanceTravelledOpt.style.display = 'block';
    trainingTimeOpt.style.display = 'none';
  } else if (trainingType === 'strength') {
    trainingTimeOpt.style.display = 'block'; 
    distanceTravelledOpt.style.display = 'none';
  } else {
    distanceTravelledOpt.style.display = 'none';
    trainingTimeOpt.style.display = 'none';
  }
}

// Count TDEE value function wrapper
const countTdee = () => {
  // Count BMR for a Female or a Male
  const countBmr = () => {
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let age = Number(document.getElementById('ageField').value);
    let weigth = Number(document.getElementById('weigthField').value);
    let heigth = Number(document.getElementById('heigthField').value);
    let bmrValue = 0;
    if (gender === 'female') {
      let bmrFemale = Math.round((9.99 * weigth) + (6.25 * heigth) - (4.92 * age) - 161);
      bmrValue = bmrFemale;
    } else if (gender === 'male') {
      let bmrMale = Math.round((9.99 * weigth) + (6.25 * heigth) - (4.92 * age) + 5);
      bmrValue = bmrMale;
    }
    return bmrValue;
  }
  let bmrValue = countBmr();

  // Count TEA
  const countTea = () => {
    let time = Number(document.getElementById('timeField').value);
    let kilometers = Number(document.getElementById('kilometersField').value);
    let training = document.getElementById('trainingField').value;
    let weigth = Number(document.getElementById('weigthField').value);
    let teaValue = 0;
    if (training === 'strength') {
      let teaStrength = 8 * time;
      teaValue = teaStrength;
    } else if (training === 'endurance') {
      let teaEndurance = (1 * weigth) * kilometers;
      teaValue = teaEndurance;
    } else {
      teaValue = 0;
    }
    return teaValue;
  }
  let teaValue = countTea();

  // Count TEF
  const countTef = () => {
    let neat = Number(document.getElementById('neatField').value);
    let tef = Number(document.getElementById('tefField').value);
    let tefValue = (bmrValue + teaValue + neat) * tef;
    return tefValue;
  }
  let tefValue = countTef();
  let neat = Number(document.getElementById('neatField').value);

  // Actual TDEE count
  let tdeeValue = Math.floor(bmrValue + teaValue + tefValue + neat);

  // Generate actual date with custom data
  const getTimestamp = () => {
    let date = new Date();
    let actualDate = ("0" + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear() + ', ' + ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2) + ':' + ("0" + date.getSeconds()).slice(-2);
    return actualDate;
  }

  // Add calculations to the local storage
  let date = getTimestamp();
  localStorage.setItem(date, tdeeValue);
}
let submit = document.getElementById('submitButton');

// EventListner for submit button - Count Tdee and Refresh Page
submit.addEventListener('click', () => {
  countTdee();
  refreshPage();
});

// Display last outcome
const displayLastOutcome = () => {
  for (let i = 0; i < localStorage.length; i++) {
    let displayKey = localStorage.key(i);
    let displayValue = localStorage.getItem(localStorage.key(i));
    let wholeLine = 'You can eat: ' + displayValue + ' kcal' + '<br>' + '(' + displayKey + ')';
    document.getElementById('lastoutcome').innerHTML = wholeLine;
  }
}
let lastOutcome = displayLastOutcome();

// Sort objects in localStorage
const sortObjects = () => {
  let localStorageArray = new Array();
  for (let i = 0; i < localStorage.length; i++ ){
    let displayKey = localStorage.key(i);
    let displayValue = localStorage.getItem(localStorage.key(i));
    localStorageArray[i] = (displayKey + ', kcal: ' + displayValue);
  }
  let sortedArray = localStorageArray.reverse();
  return sortedArray;
}
let sortedObjects = sortObjects();

// Console log the array because why not
console.log(sortedObjects);

// Display history from local storage array
const displayHistory = () => {
  for (let i = 1; i < sortedObjects.length; i++) {
    let li = document.createElement('li');
    let wholeLine = document.createTextNode(sortedObjects[i]);
    li.appendChild(wholeLine);
    document.querySelector('ul').appendChild(li);
  }
}
let history = displayHistory();

// Refresh page function
const refreshPage = () => {
  window.location.reload();
}
