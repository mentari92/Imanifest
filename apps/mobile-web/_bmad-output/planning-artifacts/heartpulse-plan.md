# Implementation Plan: HeartPulse (Voice AI)

**Status:** Implementation in Progress  
**Objective:** Create the HeartPulse tab where users can speak their problems, and receive a dual-layer response (Quran API + Logical Explanation) in English.

## Acceptance Criteria
- [ ] AC-1: Integrate standard `SpeechRecognition` (Web Speech API) for instantaneous Voice-to-Text on the web.
- [ ] AC-2: Translate `heartpulse.tsx` and all child components to English.
- [ ] AC-3: Update HeartPulse UI to use Bazi premium colors (Vivid Pink/Navy).
- [ ] AC-4: Include "Logical Explanation" in the response format expectations.

## Task List
- [ ] Task 1: Refactor `VoiceRecorder.tsx` to use Web Speech API instead of `expo-av`.
- [ ] Task 2: Translate `app/(tabs)/heartpulse.tsx` text/voice tabs and lists into English.
- [ ] Task 3: Apply `bg-surface-card` and `backdrop-blur-md` for the glassmorphism feel.
