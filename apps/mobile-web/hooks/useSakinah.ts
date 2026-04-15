import { useState, useCallback, useEffect } from "react";
import { api } from "../lib/api";

interface Reciter {
  id: number;
  name: string;
  arabicName: string;
  style: string;
}

interface Surah {
  number: number;
  name: string;
  englishName: string;
  versesCount: number;
}

interface Ambiance {
  id: string;
  name: string;
  icon: string;
  url: string;
}

interface UseSakinahReturn {
  reciters: Reciter[];
  surahs: Surah[];
  ambiances: Ambiance[];
  selectedReciter: Reciter | null;
  selectedSurah: Surah | null;
  selectedAmbiance: Ambiance | null;
  audioUrl: string | null;
  isLoading: boolean;
  error: string | null;
  selectReciter: (reciter: Reciter) => void;
  selectSurah: (surah: Surah) => void;
  selectAmbiance: (ambiance: Ambiance) => void;
}

const AMBIANCE_PRESETS: Ambiance[] = [
  { id: "zamzam", name: "Zamzam Flow", icon: "💧", url: "https://www.soundjay.com/nature/river-1.mp3" },
  { id: "rain", name: "Rain of Sakinah", icon: "🌧️", url: "https://www.soundjay.com/nature/rain-07.mp3" },
  { id: "birds", name: "Garden of Peace", icon: "🐦", url: "https://www.soundjay.com/nature/birds-1.mp3" },
  { id: "tafakkur", name: "Deep Tafakkur Pad", icon: "✨", url: "https://www.soundjay.com/misc/ambient-1.mp3" },
];

export function useSakinah(): UseSakinahReturn {
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedReciter, setSelectedReciter] = useState<Reciter | null>(null);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [selectedAmbiance, setSelectedAmbiance] = useState<Ambiance | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load reciters and surahs on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [recitersRes, surahsRes] = await Promise.all([
          api.get<Reciter[]>("/sakinah/reciters"),
          api.get<Surah[]>("/sakinah/surahs"),
        ]);
        setReciters(recitersRes.data);
        setSurahs(surahsRes.data);

        // Default: first reciter + Al-Fatiha
        if (recitersRes.data.length > 0) {
          setSelectedReciter(recitersRes.data[0]);
        }
        const fatiha = surahsRes.data.find((s) => s.number === 1);
        if (fatiha) {
          setSelectedSurah(fatiha);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Load audio when both reciter and surah are selected
  const loadAudio = useCallback(async (reciterId: number, surahNumber: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get<{ url: string }>(
        `/sakinah/audio?reciterId=${reciterId}&surahNumber=${surahNumber}`,
      );
      setAudioUrl(res.data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load audio");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectReciter = useCallback(
    (reciter: Reciter) => {
      setSelectedReciter(reciter);
      if (selectedSurah) {
        loadAudio(reciter.id, selectedSurah.number);
      }
    },
    [selectedSurah, loadAudio],
  );

  const selectSurah = useCallback(
    (surah: Surah) => {
      setSelectedSurah(surah);
      if (selectedReciter) {
        loadAudio(selectedReciter.id, surah.number);
      }
    },
    [selectedReciter, loadAudio],
  );

  const selectAmbiance = useCallback((ambiance: Ambiance) => {
    setSelectedAmbiance(ambiance);
  }, []);

  return {
    reciters,
    surahs,
    ambiances: AMBIANCE_PRESETS,
    selectedReciter,
    selectedSurah,
    selectedAmbiance,
    audioUrl,
    isLoading,
    error,
    selectReciter,
    selectSurah,
    selectAmbiance,
  };
}