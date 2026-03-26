import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGreetings, useCreateGreeting, useDeleteGreeting } from '../hooks/useGreetings';
import { fetchHealth } from '../lib/api';

export default function HomePage() {
  const [message, setMessage] = useState('');
  const health = useQuery({ queryKey: ['health'], queryFn: fetchHealth });
  const { data: greetings, isLoading, error } = useGreetings();
  const createMutation = useCreateGreeting();
  const deleteMutation = useDeleteGreeting();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    createMutation.mutate(message.trim(), {
      onSuccess: () => setMessage(''),
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-4xl font-bold text-gray-900">Hello World</h1>
        <p className="mt-2 text-sm text-gray-500">
          API: {health.data?.status ?? 'connecting…'}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a greeting…"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {createMutation.isPending ? 'Sending…' : 'Send'}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          {isLoading && <p className="text-gray-500">Loading greetings…</p>}
          {error && <p className="text-red-600">Failed to load greetings</p>}
          {greetings?.length === 0 && (
            <p className="text-gray-400">No greetings yet. Add one above!</p>
          )}
          {greetings?.map((g) => (
            <div
              key={g.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3"
            >
              <div>
                <p className="text-gray-900">{g.message}</p>
                <p className="text-xs text-gray-400">
                  {new Date(g.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => deleteMutation.mutate(g.id)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
