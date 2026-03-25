import { useQuery } from "@tanstack/react-query";

async function fetchHealth() {
  const res = await fetch("/api/health");
  return res.json();
}

export default function HomePage() {
  const { data } = useQuery({ queryKey: ["health"], queryFn: fetchHealth });

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Hello World</h1>
        <p className="mt-4 text-gray-600">
          API status: {data?.status ?? "loading…"}
        </p>
      </div>
    </main>
  );
}
