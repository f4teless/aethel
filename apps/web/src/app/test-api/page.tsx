import { ApiTest } from "@/components/api-test";

export default function TestPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">API Test Page</h1>
        <ApiTest />
      </div>
    </div>
  );
}
