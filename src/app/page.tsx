import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">Calculator</h1>
      <Calculator />
    </main>
  );
}
