
import React, { useState, useCallback } from 'react';
import { QUIZ_QUESTIONS } from './constants/quizData';
import { OptionKey } from './types';
import Question from './components/Question';
import Results from './components/Results';

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<OptionKey | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswerSelect = useCallback((selectedOption: OptionKey) => {
    if (selectedAnswer) return;

    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    const correct = selectedOption === currentQuestion.correctAnswer;

    setSelectedAnswer(selectedOption);
    setFeedback(currentQuestion.options[selectedOption].feedback);
    setIsCorrect(correct);

    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
  }, [currentQuestionIndex, selectedAnswer]);

  const handleNextQuestion = useCallback(() => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer(null);
      setFeedback(null);
      setIsCorrect(null);
    } else {
      setShowResults(true);
    }
  }, [currentQuestionIndex]);
  
  const handleRestartQuiz = useCallback(() => {
      setCurrentQuestionIndex(0);
      setScore(0);
      setShowResults(false);
      setSelectedAnswer(null);
      setFeedback(null);
      setIsCorrect(null);
  }, []);

  const progressPercentage = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
          body { font-family: 'Poppins', sans-serif; }
          .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>

      <div className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-2">
          Desvendando o Mundo Digital!
        </h1>
        <p className="text-2xl text-slate-300">🌐🧩</p>
      </div>

      {showResults ? (
        <Results 
          score={score} 
          totalQuestions={QUIZ_QUESTIONS.length} 
          onRestart={handleRestartQuiz} 
        />
      ) : (
        <>
            <div className="w-full max-w-4xl mb-4">
                <div className="w-full bg-slate-700 rounded-full h-4">
                    <div 
                        className="bg-gradient-to-r from-cyan-400 to-green-400 h-4 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
            <Question
              questionData={QUIZ_QUESTIONS[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={QUIZ_QUESTIONS.length}
              onAnswerSelect={handleAnswerSelect}
              selectedAnswer={selectedAnswer}
              feedback={feedback}
              isCorrect={isCorrect}
              onNext={handleNextQuestion}
            />
        </>
      )}
      <footer className="mt-8 text-sm text-slate-500">
        Criado para ensinar Cidadania Digital de forma divertida.
      </footer>
    </main>
  );
};

export default App;
