// Ambil elemen utama
const body = document.querySelector("body");
const modeToggle = document.querySelector(".mode-toggle");
const sidebar = document.querySelector("nav");
const sidebarToggle = document.querySelector(".sidebar-toggle");

// Cek mode tersimpan di localStorage
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.classList.add("dark");
}

// Cek status sidebar tersimpan
let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
    sidebar.classList.add("close");
}

// Fungsi untuk update tema chart saat dark/light mode
function updateChartTheme() {
    if (typeof rekapChart !== "undefined") {
        const isDark = body.classList.contains("dark");
        rekapChart.options.plugins.legend.labels.color = isDark ? "#fff" : "#333";
        rekapChart.options.plugins.datalabels.color = isDark ? "#fff" : "#000";
        rekapChart.options.scales.x.ticks.color = isDark ? "#fff" : "#333";
        rekapChart.options.scales.y.ticks.color = isDark ? "#fff" : "#333";
        rekapChart.update();
    }
}

// Event toggle dark mode
modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }

    updateChartTheme(); // update grafik biar ikutan
});

// Event toggle sidebar
sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");

    if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
    } else {
        localStorage.setItem("status", "open");
    }
});
