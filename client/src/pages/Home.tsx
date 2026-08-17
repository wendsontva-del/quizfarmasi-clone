// Direção visual: coluna central, fundo azul royal, cartões vermelhos com outline branco e feedback semântico fiel à referência.
import { useEffect, useRef, useState } from "react";
import { Check, ChevronRight, Volume2, VolumeX, RotateCcw, Trophy } from "lucide-react";
import { questions } from "@/lib/questions";

type AudioController = { stop: () => void; start: () => void; answer: (correct: boolean) => void };

function createAudioController(): AudioController {
  let ctx: AudioContext | null = null;
  let timer: number | undefined;
  const getContext = () => {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  };
  const tone = (frequency: number, duration: number, type: OscillatorType = "sine") => {
    const audio = getContext();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.045, audio.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + duration + 0.02);
  };
  const start = () => {
    stop();
    timer = window.setInterval(() => tone(196, 0.42, "triangle"), 1800);
  };
  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = undefined;
  };
  return {
    stop,
    start,
    answer: (correct) => {
      tone(correct ? 660 : 180, 0.18, correct ? "sine" : "sawtooth");
      if (correct) window.setTimeout(() => tone(880, 0.2), 100);
    },
  };
}

export default function Home() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const [finished, setFinished] = useState(false);
  const audio = useRef<AudioController | null>(null);
  const question = questions[questionIndex];

  useEffect(() => () => audio.current?.stop(), []);

  const toggleMusic = () => {
    audio.current ??= createAudioController();
    if (musicOn) audio.current.stop();
    else {
      const controller = audio.current;
      // A short tone unlocks audio only after the explicit user gesture.
      controller.answer(true);
      (controller as AudioController & { start?: () => void }).start?.();
    }
    setMusicOn((value) => !value);
  };

  const choose = (optionIndex: number) => {
    if (selected !== null) return;
    const correct = optionIndex === question.correctIndex;
    audio.current ??= createAudioController();
    audio.current.answer(correct);
    setSelected(optionIndex);
    if (correct) setScore((value) => value + 1);
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

  if (finished) {
    return (
      <main className="quiz-shell result-shell">
        <section className="result-card" aria-labelledby="result-title">
          <div className="result-icon"><Trophy size={34} strokeWidth={2.5} /></div>
          <p className="eyebrow">Quiz concluído</p>
          <h1 id="result-title">Seu resultado</h1>
          <p className="result-score"><strong>{score}</strong> de {questions.length} pontos</p>
          <p className="result-copy">Você completou todas as perguntas do Quiz Farmasi.</p>
          <button className="next-button restart-button" onClick={restart} type="button"><RotateCcw size={18} /> Refazer quiz</button>
        </section>
        <div className="manus-badge">◉ Made with Manus</div>
      </main>
    );
  }

  return (
    <main className="quiz-shell">
      <button className={`music-toggle ${musicOn ? "is-on" : ""}`} onClick={toggleMusic} type="button" aria-label={musicOn ? "Desligar música" : "Ligar música"} title={musicOn ? "Desligar música" : "Ligar música"}>
        {musicOn ? <Volume2 size={21} /> : <VolumeX size={21} />}
      </button>
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
      <div className="manus-badge">◉ Made with Manus</div>
    </main>
  );
}
