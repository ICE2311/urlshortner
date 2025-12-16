import LinksTable from "@/components/LinksTable";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Monitor and manage all your shortened links in one place
          </p>
        </div>

        {/* Links Table */}
        <LinksTable />
      </div>
    </div>
  );
}
