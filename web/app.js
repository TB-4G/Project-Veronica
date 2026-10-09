
"use strict";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const state = {
  running: false,
  progress: 0,
  timer: null
};

const bootButton = $("#boot-button");
const bootProgress = $("#boot-progress");
const bootPercent = $("#boot-percent");
const bootMessage = $("#boot-message");
const bootTag = $("#boot-tag");
const systemState = $("#system-state");
const monitorState = $("#monitor-state");
const terminal = $("#terminal");

function log(message) {
  const line = document.createElement("p");
  const prefix = document.createElement("span");

  prefix.textContent = "[VERONICA] ";
  line.append(prefix, document.createTextNode(message));
  terminal.appendChild(line);

  while (terminal.children.length > 8) {
    terminal.removeChild(terminal.firstElementChild);
  }

  terminal.scrollTop = terminal.scrollHeight;
}

function setProgress(value) {
  state.progress = value;
  bootProgress.style.width = `${value}%`;
  bootPercent.textContent = `${value}%`;
}

function resetSystem() {
  clearInterval(state.timer);
  state.timer = null;
  state.running = false;
  state.progress = 0;

  setProgress(0);
  systemState.textContent = "STANDBY";
  monitorState.textContent = "Standby";
  bootMessage.textContent = "Awaiting user command";
  bootTag.textContent = "IDLE";
  bootButton.disabled = false;
  bootButton.innerHTML = "<span>▶</span> Initialize System";

  log("Environment returned to standby.");
}

function initializeSystem() {
  if (state.running) return;

  clearInterval(state.timer);
  state.running = true;

  bootButton.disabled = true;
  bootButton.textContent = "Initializing...";
  bootTag.textContent = "RUNNING";
  systemState.textContent = "INITIALIZING";
  monitorState.textContent = "Initializing";

  const steps = [
    { progress: 20, message: "Preparing virtual environment..." },
    { progress: 45, message: "Loading interface modules..." },
    { progress: 70, message: "Checking simulation components..." },
    { progress: 90, message: "Finalizing demonstration sequence..." },
    { progress: 100, message: "Simulation interface ready." }
  ];

  let index = 0;

  log("Initialization sequence started.");

  state.timer = setInterval(() => {
    const step = steps[index];

    setProgress(step.progress);
    bootMessage.textContent = step.message;
    log(step.message);

    index += 1;

    if (index >= steps.length) {
      clearInterval(state.timer);
      state.timer = null;
      state.running = false;

      systemState.textContent = "READY";
      monitorState.textContent = "Ready (simulation)";
      bootTag.textContent = "READY";
      bootButton.disabled = false;
      bootButton.textContent = "↻ Restart Sequence";

      log("Demo sequence completed successfully.");
      log("No Xbox hardware or game emulation was performed.");
    }
  }, 650);
}

function showPage(pageId) {
  const page = document.getElementById(pageId);

  if (!page || !page.classList.contains("page")) return;

  $$(".page").forEach((item) => {
    item.classList.toggle("active", item.id === pageId);
  });

  $$(".nav-item").forEach((item) => {
    const selected = item.dataset.page === pageId;
    item.classList.toggle("active", selected);

    if (selected) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });

  const activeButton = $(`.nav-item[data-page="${pageId}"]`);
  $("#page-label").textContent = activeButton
    ? activeButton.textContent.trim()
    : "Overview";

  history.replaceState(null, "", `#${pageId}`);
}

$$(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

$$("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.go);
  });
});

bootButton.addEventListener("click", initializeSystem);
$("#reset-button").addEventListener("click", resetSystem);

$("#effects-toggle").addEventListener("change", (event) => {
  document.body.classList.toggle(
    "effects-off",
    !event.target.checked
  );
});

$("#accent-select").addEventListener("change", (event) => {
  const colors = {
    green: "#69f59a",
    cyan: "#6debe0",
    amber: "#ffc76a"
  };

  document.documentElement.style.setProperty(
    "--accent",
    colors[event.target.value] || colors.green
  );
});

window.addEventListener("hashchange", () => {
  const pageId = location.hash.slice(1);
  if (pageId) showPage(pageId);
});

const initialPage = location.hash.slice(1);
if (initialPage && document.getElementById(initialPage)?.classList.contains("page")) {
  showPage(initialPage);
} else {
  showPage("dashboard");
}
