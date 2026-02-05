"use strict";

let allCourses = [];



document.addEventListener("DOMContentLoaded", async () => {
  loadData();
  //Händelselyssnare för sortering
  document.getElementById("sort-code").addEventListener("click", () => {
    const sortedByCode = [...allCourses].sort((a,b) => a.code.localeCompare(b.code));
    displayCourses(sortedByCode);

  });

  document.getElementById("sort-name").addEventListener("click", () => {
    const sortedByName = [...allCourses].sort((a,b) => a.coursename.localeCompare(b.coursename));
    displayCourses(sortedByName);
  });

  document.getElementById("sort-progression").addEventListener("click", () => {
    const sortedByProgression = [...allCourses].sort((a,b) => a.progression.localeCompare(b.progression));
    displayCourses(sortedByProgression);

  });
});



async function loadData() {
const url = "https://webbutveckling.miun.se/files/ramschema.json";
  //anropa och läs ut data

  try {
const response = await fetch(url);
allCourses = await response.json();
//Lagra globalt 
console.table(allCourses);

displayCourses(allCourses); //Anropar funktion för att skriva ut tabell 
  } catch(error) {
    console.error("Fel: " + error);

  }
}

function displayCourses(courses) {
 
  const courseListEl = document.getElementById("course-list");
  //loopa ut

  courseListEl.innerHTML = ""; //Nollställer varje gång 
  
  courses.forEach(course => {
    // För varje kurs lägger vi till en ny rad i tabellen
    courseListEl.innerHTML += `
      <tr>
        <td>${course.code}</td>
        <td>${course.coursename}</td>
        <td>${course.progression}</td>
      </tr>
    `;
  });
}

window.onload = () => {
  //Händelselyssanre
  document.getElementById("search").addEventListener("input", filterData);

}

function filterData() {
  // 1. Hämta det man skrivit och gör till små bokstäver
  let searchPhrase = document.getElementById("search").value.toLowerCase();
  
  // 2. Filtrera allCourses 
  let filterCourses = allCourses.filter((course) => {
    // Kolla om koden eller namnet innehåller det vi sökt efter
    return course.code.toLowerCase().includes(searchPhrase) || 
           course.coursename.toLowerCase().includes(searchPhrase);
  });

  // 3. Visa de kurser som blev kvar efter filtreringen
  displayCourses(filterCourses);
}