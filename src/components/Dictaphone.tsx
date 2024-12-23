import { useEffect, useState, useMemo } from "react";

const Dictaphone = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState<string | null | never>(null);
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const mic = useMemo(
    () => (SpeechRecognition ? new SpeechRecognition() : null),
    [SpeechRecognition]
  );

  useEffect(() => {
    if (!mic) {
      console.error("SpeechRecognition is not supported in this browser.");
      return;
    }

    const handleListen = () => {
      if (isListening) {
        mic.start();
        mic.onend = () => {
          console.log("continue..");
          mic.start();
        };
      } else {
        mic.stop();
        mic.onend = () => {
          console.log("Stopped Mic on Click");
        };
      }
      mic.onstart = () => {
        console.log("Mics on");
      };

      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        console.log(transcript);
        setNote(transcript);
        mic.onerror = (event) => {
          console.log(event.error);
        };
      };
    };
    handleListen();
  }, [isListening, mic]);

  const handleSaveNote = () => {
    if (note !== null) {
      setSavedNotes([...savedNotes, note]);
    }
    setNote("");
  };

  if (!mic) {
    return <div>SpeechRecognition is not supported in this browser.</div>;
  }

  return (
    <>
      <h1>Voice Notes</h1>
      <div className="container">
        <div className="box">
          <h2>Current Note</h2>
          {isListening ? <span>🎙️</span> : <span>🛑</span>}
          <button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <button onClick={() => setIsListening((prevState) => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div className="box">
          <h2>Notes</h2>
          {savedNotes.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dictaphone;
