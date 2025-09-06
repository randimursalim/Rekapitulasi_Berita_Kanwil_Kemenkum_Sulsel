// Ambil canvas chart
let ctx = document.getElementById("rekapChart").getContext("2d");

// Dummy data awal (bulanan)
let chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", " Nov", "Des"],
    datasets: [{
        label: "Jumlah Berita",
        data: [23, 8, 3, 12, 7, 9, 12, 7, 14, 11, 23, 23],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
    }]
};

// Inisialisasi chart
let rekapChart = new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
        responsive: true,
        plugins: {
            legend: { 
                display: true,
                position: "top",
                align: "center",
                labels: {
                    padding: 20,
                    color: "#333" // default light mode
                }
            },
            datalabels: {
                anchor: "end",
                align: "top",
                color: "#000", // default light mode
                font: { weight: "bold" },
                formatter: (value) => value
            }
        },
        layout: {
            padding: { top: 20 }
        },
        scales: {
            x: {
                ticks: { color: "#333" } // default light mode
            },
            y: { 
                beginAtZero: true,
                ticks: { color: "#333" } // default light mode
            }
        }
    },
    plugins: [ChartDataLabels]
});

// Fungsi update total berita + update skala Y
function updateTotal() {
    let total = rekapChart.data.datasets[0].data.reduce((a, b) => a + b, 0);
    document.getElementById("totalBerita").innerText = "Total Berita: " + total;

    // cari nilai maksimum di dataset
    let maxVal = Math.max(...rekapChart.data.datasets[0].data);

    // hitung margin 10% dari max
    let margin = Math.ceil(maxVal * 0.1);

    // set batas atas Y lebih tinggi dari batang tertinggi
    rekapChart.options.scales.y.suggestedMax = maxVal + margin;

    rekapChart.update();
}

// Panggil pertama kali
updateTotal();

// Event untuk tombol filter
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        if (filter === "daily") {
            rekapChart.data.labels = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
            rekapChart.data.datasets[0].data = [2, 3, 1, 5, 4, 0, 6];
        }
        else if (filter === "weekly") {
            rekapChart.data.labels = ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"];
            rekapChart.data.datasets[0].data = [10, 14, 7, 9];
        }
        else if (filter === "monthly") {
            rekapChart.data.labels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"];
            rekapChart.data.datasets[0].data = [5, 8, 3, 12, 7, 9];
        }
        else if (filter === "yearly") {
            rekapChart.data.labels = ["2021", "2022", "2023", "2024", "2025"];
            rekapChart.data.datasets[0].data = [45, 67, 52, 80, 34];
        }

        updateTotal();
    });
});

// Event untuk filter custom range
document.getElementById("apply-range").addEventListener("click", () => {
    let startDate = document.getElementById("start-date").value;
    let endDate = document.getElementById("end-date").value;

    if (!startDate || !endDate) {
        alert("Pilih rentang tanggal dulu!");
        return;
    }

    // Dummy data untuk range
    rekapChart.data.labels = ["Rentang Terpilih"];
    rekapChart.data.datasets[0].data = [Math.floor(Math.random() * 20)]; 

    updateTotal();
});

// Download JPG
document.getElementById("downloadJPG").addEventListener("click", () => {
    const canvas = document.getElementById("rekapChart");
    const url = canvas.toDataURL("image/jpeg", 1.0);

    const link = document.createElement("a");
    link.href = url;
    link.download = "rekap-berita.jpg";
    link.click();
});

// Download PDF
document.getElementById("downloadPDF").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("landscape");

    const canvas = document.getElementById("rekapChart");
    const imgData = canvas.toDataURL("image/png", 1.0);

    // Tambah judul
    pdf.setFontSize(16);
    pdf.text("Rekap Berita - KEMENKUM SULSEL", 15, 20);

    // Tambah grafik ke PDF
    pdf.addImage(imgData, "PNG", 15, 30, 260, 120);

    // Tambah total berita ke PDF
    let total = rekapChart.data.datasets[0].data.reduce((a, b) => a + b, 0);
    pdf.setFontSize(12);
    pdf.text("Total Berita: " + total, 15, 160);

    pdf.save("rekap-berita.pdf");
});
