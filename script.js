// Live Clock
function updateClock() {
  const now = new Date();

  const clock = document.getElementById("clock");
  const date = document.getElementById("date");
  const greeting = document.getElementById("greeting");

  clock.textContent = now.toLocaleTimeString("en-IN", {
    hour12: false,
  });

  date.textContent = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hour = now.getHours();
  if (hour < 12) {
    greeting.textContent = "🌅 Good Morning";
  } else if (hour < 17) {
    greeting.textContent = "☀️ Good Afternoon";
  } else if (hour < 21) {
    greeting.textContent = "🌇 Good Evening";
  } else {
    greeting.textContent = "🌙 Good Night";
  }
}

updateClock();
setInterval(updateClock, 1000);
// Google Search
const searchInput = document.getElementById("search");

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const query = this.value.trim();

    if (query !== "") {
      window.open(
        "https://www.google.com/search?q=" + encodeURIComponent(query),
        "_self",
      );
    }
  }
});

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.03)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const todoInput = document.getElementById("todoInput");
const addTodo = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
            <span>${todo}</span>
            <button onclick="deleteTodo(${index})">
                Delete
            </button>
        `;

    todoList.appendChild(li);
  });
}

function deleteTodo(index) {
  todos.splice(index, 1);

  saveTodos();

  renderTodos();
}

addTodo.addEventListener("click", () => {
  const task = todoInput.value.trim();

  if (task === "") return;

  todos.push(task);

  saveTodos();

  renderTodos();

  todoInput.value = "";
});

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo.click();
  }
});

renderTodos();

const API_KEY = "98e1583d2c330e7cea19f2ab975d3ea8";

async function loadWeather() {
  if (!navigator.geolocation) {
    document.getElementById("city").textContent = "Location unavailable";

    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;

    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);

      const data = await response.json();

      document.getElementById("temperature").textContent =
        Math.round(data.main.temp) + "°C";

      document.getElementById("city").textContent = data.name;

      document.getElementById("description").textContent =
        data.weather[0].description;

      document.getElementById("humidity").textContent =
        "💧 " + data.main.humidity + "%";

      document.getElementById("wind").textContent =
        "💨 " + data.wind.speed + " m/s";
    } catch (error) {
      document.getElementById("city").textContent = "Weather unavailable";
    }
  });
}

loadWeather();


const NASA_API_KEY = "8Siq7M3TXzFhJH4kmBwB4BeEDhXuZ5dNsVP9S2qD";

async function loadNASA() {

    try {

        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
        );

        const data = await response.json();

        const img = document.getElementById("apodImage");
        const video = document.getElementById("apodVideo");

        document.getElementById("apodTitle").textContent = data.title;
        document.getElementById("apodDate").textContent = data.date;

        if (data.media_type === "image") {

            img.src = data.url;
            img.style.display = "block";
            video.style.display = "none";

        } else {

            img.style.display = "none";
            video.src = data.url;
            video.style.display = "block";

        }

    } catch (err) {

        console.error(err);

        document.getElementById("apodTitle").textContent =
            "Unable to load NASA APOD.";

    }

}

loadNASA();

const themeToggle = document.getElementById("themeToggle");

function updateThemeIcon() {

    if (document.body.classList.contains("light")) {

        themeToggle.classList.remove("fa-moon");
        themeToggle.classList.add("fa-sun");

    } else {

        themeToggle.classList.remove("fa-sun");
        themeToggle.classList.add("fa-moon");

    }

}

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

}

updateThemeIcon();


// Button click
themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        localStorage.setItem("theme", "light");

    } else {

        localStorage.setItem("theme", "dark");

    }

    updateThemeIcon();

});