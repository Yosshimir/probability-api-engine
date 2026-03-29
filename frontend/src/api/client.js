const API_BASE = "http://localhost:5000/api/v1";

export async function fetchDistribution(data) {
  const res = await fetch(`${API_BASE}/distributions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error fetching distribution");

  return res.json();
}

export async function fetchSampling(data) {
  const res = await fetch(`${API_BASE}/sampling`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error fetching sampling");

  return res.json();
}