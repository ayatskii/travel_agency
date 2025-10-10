document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("clock");
    if (!el) return;             // если элемент не найден — выходим
    function updateClock() {
        const now = new Date();
        const opts = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "Asia/Almaty"
        };
        el.textContent = now.toLocaleString("en-US", opts);
    }
    updateClock();
    setInterval(updateClock, 1000);
});
