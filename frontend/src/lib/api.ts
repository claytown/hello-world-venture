const BASE = '/api';

export interface Greeting {
  id: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export async function fetchGreetings(): Promise<Greeting[]> {
  const res = await fetch(`${BASE}/greetings`);
  if (!res.ok) throw new Error('Failed to fetch greetings');
  return res.json();
}

export async function createGreeting(message: string): Promise<Greeting> {
  const res = await fetch(`${BASE}/greetings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error('Failed to create greeting');
  return res.json();
}

export async function deleteGreeting(id: number): Promise<void> {
  const res = await fetch(`${BASE}/greetings/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete greeting');
}

export async function fetchHealth(): Promise<{ status: string }> {
  const res = await fetch(`${BASE}/health`);
  return res.json();
}
