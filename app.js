const L = window.SignalDeskLogic;
const seed = [
  {
    id: "N17",
    severity: "high",
    acknowledged: false,
    message: "Queue latency rising",
  },
  {
    id: "A03",
    severity: "critical",
    acknowledged: false,
    message: "Payment failures",
  },
  { id: "B11", severity: "high", acknowledged: true, message: "Cache misses" },
  {
    id: "C08",
    severity: "medium",
    acknowledged: false,
    message: "Disk nearing threshold",
  },
];
let alerts = seed.slice();
let filter = "all";
const el = document.getElementById("alerts");
function render() {
  const shown = L.visibleAlerts(alerts, filter);
  el.innerHTML = shown.length
    ? shown
        .map(
          (a) =>
            `<div class="alert ${a.acknowledged ? "muted" : ""}"><div><strong>${a.message}</strong><div class="meta">${a.id} · ${a.severity} ${a.acknowledged ? "· acknowledged" : ""}</div></div>${a.acknowledged ? '<span class="ack">acknowledged</span>' : `<button onclick="ack('${a.id}')">Acknowledge</button>`}</div>`,
        )
        .join("")
    : '<div class="meta">No alerts.</div>';
  document.getElementById("summary").textContent = JSON.stringify(
    L.summary(alerts),
    null,
    2,
  );
}
window.ack = (id) => {
  alerts = L.acknowledge(alerts, id);
  render();
};
document.getElementById("allBtn").onclick = () => {
  filter = "all";
  render();
};
document.getElementById("openBtn").onclick = () => {
  filter = "open";
  render();
};
document.getElementById("criticalBtn").onclick = () => {
  filter = "critical";
  render();
};
document.getElementById("resetBtn").onclick = () => {
  alerts = seed.slice();
  filter = "all";
  render();
};
render();
