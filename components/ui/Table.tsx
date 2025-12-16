import React from "react";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className = "" }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full ${className}`}>{children}</table>
    </div>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead className="bg-gray-50 dark:bg-gray-900">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </tbody>
  );
}

export function TableRow({ children }: { children: React.ReactNode }) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      {children}
    </tr>
  );
}

export function TableHead({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td
      className={`px-6 py-4 text-sm text-gray-900 dark:text-gray-100 ${className}`}
    >
      {children}
    </td>
  );
}
