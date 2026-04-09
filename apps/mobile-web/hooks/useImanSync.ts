import { useState, useCallback } from "react";
import { api } from "../lib/api";
import type { ImanSyncAnalyzeResponse } from "@imanifest/shared";

interface UseImanSyncReturn {
  /** Analysis result from the server */
  result: ImanSyncAnalyzeResponse | null;
  /** Loading state */
  isLoading: boolean;
  /** Error message if analysis failed */
  error: string | null;
  /** Trigger text analysis */
  analyze: (intentText: string) => Promise<void>;
  /** Reset state to initial */
  reset: () => void;
}

export function useImanSync(): UseImanSyncReturn {
  const [result, setResult] = useState<ImanSyncAnalyzeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (intentText: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await api.post<ImanSyncAnalyzeResponse>(
        "/iman-sync/analyze",
        { intentText },
      );

      setResult(response.data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { result, isLoading, error, analyze, reset };
}