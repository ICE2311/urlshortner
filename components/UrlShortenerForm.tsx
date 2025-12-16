"use client";

import { useState } from "react";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";
import type { CreateLinkResponse, ApiError } from "@/types";

export default function UrlShortenerForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CreateLinkResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as ApiError;
        setError(
          errorData.details || errorData.error || "Failed to create short link"
        );
        return;
      }

      setResult(data as CreateLinkResponse);
      setUrl("");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (result?.shortUrl) {
      try {
        await navigator.clipboard.writeText(result.shortUrl);
        alert("Short URL copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Shorten Your URL
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Paste your long URL below and get a short, shareable link instantly.
          </p>
        </div>

        <Input
          type="url"
          placeholder="https://example.com/very/long/url..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          error={error}
          label="Long URL"
        />

        <Button type="submit" isLoading={isLoading} className="w-full">
          {isLoading ? "Shortening..." : "Shorten URL"}
        </Button>

        {result && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">
              ✓ Short URL created successfully!
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={result.shortUrl}
                className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-700 rounded text-green-700 dark:text-green-300 font-mono text-sm"
              />
              <Button onClick={handleCopy} variant="secondary" type="button">
                Copy
              </Button>
            </div>
          </div>
        )}
      </form>
    </Card>
  );
}
