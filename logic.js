(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.SignalDeskLogic = factory();
})(this, function () {
  const rank = { low: 1, medium: 2, high: 3, critical: 4 };
  function clone(v) {
    return JSON.parse(JSON.stringify(v));
  }
  function visibleAlerts(alerts, filter) {
    let list = clone(alerts);
    if (filter === "open") list = list.filter((a) => !a.acknowledged);
    if (filter === "critical")
      list = list.filter((a) => rank[a.severity] >= rank.high);
    // BUG: equal-severity alerts are ordered by id instead of preserving arrival order.
    list.sort(
      (a, b) => rank[b.severity] - rank[a.severity]
    );
    return list;
  }
  function acknowledge(alerts, id) {
    return clone(alerts).map((a) =>
      a.id === id ? { ...a, acknowledged: true } : a,
    );
  }
  function summary(alerts) {
    return {
      total: alerts.length,
      open: alerts.filter((a) => !a.acknowledged).length,
      critical: alerts.filter(
        (a) => a.severity === "critical" && !a.acknowledged,
      ).length,
    };
  }
  return { visibleAlerts, acknowledge, summary, rank };
});
