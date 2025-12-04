import { useEffect, useRef, useState } from "react";

export const useVoiceInput = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e) => {
      const last = e.results.length - 1;
      const text = e.results[last][0].transcript;
      setTranscript((prev) => (prev ? prev + " " + text : text));
    };

    recognition.onerror = (e) => {
      setError(e.error || "Speech recognition error");
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const start = () => {
    setTranscript("");
    setError(null);
    if (!recognitionRef.current) {
      setError("Speech recognition not available.");
      return;
    }
    recognitionRef.current.start();
    setListening(true);
  };

  const stop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return { listening, transcript, error, start, stop, setTranscript };
};
