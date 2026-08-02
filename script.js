// CLOCK

function updateClock() {
  const now = new Date();

  // Time

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Date

  const date = now.toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  document.getElementById("clock").textContent = time;

  document.getElementById("date").textContent = date;

  // Greeting

  const hour = now.getHours();

  let greeting;

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  document.getElementById("greeting").textContent = greeting;
}

updateClock();

setInterval(updateClock, 1000);

// SEARCH

const searchForm = document.getElementById("searchForm");

const searchInput = document.getElementById("searchInput");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const search = searchInput.value.trim();

  if (search !== "") {
    const url = "https://www.google.com/search?q=" + encodeURIComponent(search);

    window.location.href = url;
  }
});

// TODO LIST

const todoForm = document.getElementById("todoForm");

const todoInput = document.getElementById("todoInput");

const todoList = document.getElementById("todoList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
  todoList.innerHTML = "";

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");

    const text = document.createElement("span");

    text.textContent = task;

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "✕";

    deleteButton.addEventListener("click", function () {
      deleteTask(index);
    });

    li.appendChild(text);

    li.appendChild(deleteButton);

    todoList.appendChild(li);
  });
}

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const task = todoInput.value.trim();

  if (task !== "") {
    tasks.push(task);

    saveTasks();

    displayTasks();
    todoInput.value = "";
  }
});

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}
displayTasks();

// Use DEMO_KEY .

const NASA_API_KEY = "8Siq7M3TXzFhJH4kmBwB4BeEDhXuZ5dNsVP9S2qD";

async function loadNASAImage() {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error("NASA API request failed: " + response.status);
    }

    const data = await response.json();

    // APOD can be an image or a video.

    if (data.media_type === "image") {
      document.body.style.backgroundImage = `
                linear-gradient(
                    rgba(0, 0, 0, 0.45),
                    rgba(0, 0, 0, 0.45)
                ),
                url("${data.url}")
            `;

      document.getElementById("nasaTitle").textContent = data.title;
    } else {
      document.getElementById("nasaTitle").textContent =
        "NASA APOD: video today";
    }
  } catch (error) {
    console.log("NASA APOD failed:", error);
  }
}

loadNASAImage();
