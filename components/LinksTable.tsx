"use client";

import { useEffect, useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./ui/Table";
import type { Link } from "@/types";

export default function LinksTable() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/links");

      if (!response.ok) {
        throw new Error("Failed to fetch links");
      }

      const data = await response.json();
      setLinks(data);
    } catch (err) {
      setError("Failed to load links. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) {
      return;
    }

    try {
      const response = await fetch(`/api/links/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete link");
      }

      // Refresh the list
      await fetchLinks();
    } catch (err) {
      alert("Failed to delete link. Please try again.");
    }
  };

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (shortCode: string, linkId: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    const shortUrl = `${baseUrl}/${shortCode}`;

    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(linkId);
      setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
      // Fallback: try using older method
      const textArea = document.createElement("textarea");
      textArea.value = shortUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopiedId(linkId);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (fallbackErr) {
        alert("Failed to copy. Please copy manually: " + shortUrl);
      }
      document.body.removeChild(textArea);
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <Card>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading links...
          </p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <Button onClick={fetchLinks} variant="secondary" className="mt-4">
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  if (links.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No links yet
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create your first short link to get started!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Links
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage and track your shortened URLs
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Short Code</TableHead>
            <TableHead>Original URL</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id}>
              <TableCell>
                <code className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded font-mono text-sm">
                  {link.shortCode}
                </code>
              </TableCell>
              <TableCell>
                <a
                  href={link.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline truncate block max-w-md"
                  title={link.originalUrl}
                >
                  {link.originalUrl.length > 50
                    ? `${link.originalUrl.substring(0, 50)}...`
                    : link.originalUrl}
                </a>
              </TableCell>
              <TableCell>
                <span className="font-semibold">{link.clickCount}</span>
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {formatDate(link.createdAt)}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(link.shortCode, link.id)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm"
                  >
                    {copiedId === link.id ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={() => handleDelete(link.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium text-sm"
                  >
                    Delete
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
