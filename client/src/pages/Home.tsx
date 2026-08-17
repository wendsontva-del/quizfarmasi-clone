// Direção visual: flat playful edtech fiel ao site de referência; áudio real em loop, sem selo de atribuição adicional.
import { useEffect, useRef, useState } from "react";
import { Check, ChevronRight, Volume2, VolumeX, RotateCcw, Trophy } from "lucide-react";
import { questions } from "@/lib/questions";

const MUSIC_SRC = "/manus-storage/quizfarmasi-background_bc6c9afd.wav";

export default function Home() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const [finished, setFinished] = useState(false);
  const musicRef = useRef<HTMLAudioElement>(null);
  const question = questions[questionIndex];

  useEffect(() => {
    const music = musicRef.current;
    if (!music) return;
    music.loop = true;
    music.volume = 0.18;
    return () => {
      music.pause();
      music.currentTime = 0;
    };
  }, []);

  const toggleMusic = async () => {
    const music = musicRef.current;
    if (!music) return;
    if (musicOn) {
      music.pause();
      setMusicOn(false);
      return;
    }
    try {
      await music.play();
      setMusicOn(true);
    } catch {
      setMusicOn(false);
    }
  };

  const choose = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === question.correctIndex) setScore((value) => value + 1);
  };

  const next = () => {
    if (questionIndex === questions.length - 1) setFinished(true);
    else {
      setQuestionIndex((value) => value + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <main className={`quiz-shell ${finished ? "result-shell" : ""}`}>
      <audio ref={musicRef} src={MUSIC_SRC} preload="auto" aria-hidden="true" />
      {!finished && (
        <button className={`music-toggle ${musicOn ? "is-on" : ""}`} onClick={toggleMusic} type="button" aria-label={musicOn ? "Desligar música" : "Ligar música"} title={musicOn ? "Desligar música" : "Ligar música"}>
          {musicOn ? <Volume2 size={21} /> : <VolumeX size={21} />}
        </button>
      )}
      {finished ? (
        <section className="result-card" aria-labelledby="result-title">
          <div className="result-icon"><Trophy size={34} strokeWidth={2.5} /></div>
          <p className="eyebrow">Quiz concluído</p>
          <h1 id="result-title">Seu resultado</h1>
          <p className="result-score"><strong>{score}</strong> de {questions.length} pontos</p>
          <p className="result-copy">Você completou todas as perguntas do Quiz Farmasi.</p>
          <button className="next-button restart-button" onClick={restart} type="button"><RotateCcw size={18} /> Refazer quiz</button>
        </section>
      ) : (
        <section className="quiz-content" aria-live="polite">
          <header className="quiz-header">
            <p>Questão {questionIndex + 1} de {questions.length}</p>
            <div className="progress" aria-label={`Questão ${questionIndex + 1} de ${questions.length}`}>
              {questions.map((_, index) => <span className={index <= questionIndex ? "active" : ""} key={index} />)}
            </div>
            <p>Pontos: {score}</p>
          </header>
          <h1 className="question-card">{question.prompt}</h1>
          <div className="options" role="group" aria-label="Alternativas">
            {question.options.map((option, index) => {
              const answered = selected !== null;
              const isCorrect = index === question.correctIndex;
              const isSelected = index === selected;
              const state = !answered ? "idle" : isCorrect ? "correct" : isSelected ? "wrong" : "muted";
              return <button key={option} type="button" className={`option-card ${state}`} onClick={() => choose(index)} disabled={answered} aria-pressed={isSelected}>
                <span className="option-number">{index + 1}</span><span>{option}</span>{answered && isCorrect && <Check className="check" size={21} />}
              </button>;
            })}
          </div>
          {selected !== null && <button className="next-button" onClick={next} type="button">{questionIndex === questions.length - 1 ? "Resultado" : "Próxima"}<ChevronRight size={20} /></button>}
        </section>
      )}
    </main>
  );
}
