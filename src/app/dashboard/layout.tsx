import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex bg-white">
      <Sidebar />
      <div className="hidden lg:block flex-shrink-0 w-64" />
      <main className="flex-1 overflow-x-hidden min-w-0">
        <div className="p-4 lg:p-6 pt-16 lg:pt-6">{children}</div>
      </main>
    </div>
  );
}
