import React, { useState, useRef, useCallback } from 'react';
import SparkleBackground from './components/SparkleBackground';
import TypingLetter from './components/TypingLetter';

interface FloatingWordProps {
  text: string;
  x: number;
  y: number;
  onAnimationEnd: () => void;
}

const FloatingWord: React.FC<FloatingWordProps> = ({ text, x, y, onAnimationEnd }) => {
  return (
    <span
      className="absolute text-pink-300 text-2xl font-great-vibes pointer-events-none animate-float-up"
      style={{
        left: x,
        top: y,
        textShadow: '0 0 5px #f9a8d4, 0 0 10px #f472b6',
        zIndex: 100,
      }}
      onAnimationEnd={onAnimationEnd}
    >
      {text}
    </span>
  );
};


const HeartIcon = () => (
    <div className="relative w-40 h-40 animate-float flex items-center justify-center">
        <div className="relative w-[110px] h-[100px]">
            <div 
                className="absolute top-0 left-[55px] w-[55px] h-[90px] bg-red-500 rounded-[50px_50px_0_0] transform rotate-[-45deg]"
                style={{ 
                    transformOrigin: '0 100%',
                    boxShadow: '0 0 20px #f87171, 0 0 40px #ef4444, 0 0 60px #dc2626'
                }}
            ></div>
            <div 
                className="absolute top-0 left-0 w-[55px] h-[90px] bg-red-500 rounded-[50px_50px_0_0] transform rotate-[45deg]"
                style={{ 
                    transformOrigin: '100% 100%',
                    boxShadow: '0 0 20px #f87171, 0 0 40px #ef4444, 0 0 60px #dc2626'
                }}
            ></div>
        </div>
    </div>
);

const LetterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
);


const ActionButton: React.FC<{ onClick: () => void; children: React.ReactNode; }> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-red-500/50 transform hover:scale-105 transition-all duration-300 ease-in-out w-full max-w-xs"
  >
    {children}
  </button>
);

const App: React.FC = () => {
  const [isLetterVisible, setIsLetterVisible] = useState(false);
  const [floatingWords, setFloatingWords] = useState<Array<{id: number; text: string; x: number; y: number}>>([]);

  const phrases = [
    "Gracias por ser mi amiga",
    "Eres increíble",
    "Valoro mucho tu amistad",
    "Contigo todo es mejor",
    "Qué suerte tenerte",
    "Tu amistad es un tesoro",
    "Iluminas mis días"
  ];

  const letterContent = `Para mi amiga especial,

Hay personas que llegan a tu vida y la hacen más brillante, y tú eres una de ellas. Quería tomarme un momento para decirte lo increíble que eres y lo mucho que valoro nuestra amistad.

Cada risa, cada consejo, cada momento que compartimos es un tesoro para mí. Eres esa persona que hace que los días buenos sean mejores y los malos, más llevaderos.

Gracias por tu apoyo incondicional, por tu energía tan bonita y por ser simplemente tú. Espero que nunca olvides lo especial que eres y la alegría que traes a mi vida.

Con todo mi cariño,
[Tu Nombre]`;

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }

    const newWord = {
      id: Date.now() + Math.random(),
      text: phrases[Math.floor(Math.random() * phrases.length)],
      x: e.clientX,
      y: e.clientY,
    };
    setFloatingWords(currentWords => [...currentWords, newWord]);
  };

  const handleWordAnimationEnd = (id: number) => {
    setFloatingWords(currentWords => currentWords.filter(word => word.id !== id));
  };


  return (
    <div 
      className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative cursor-pointer"
      onClick={handleScreenClick}
    >
      <SparkleBackground />

      {floatingWords.map(word => (
        <FloatingWord
          key={word.id}
          text={word.text}
          x={word.x}
          y={word.y}
          onAnimationEnd={() => handleWordAnimationEnd(word.id)}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-great-vibes font-bold text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]">
            Una palabra para ti...
          </h1>
        </div>

        <HeartIcon />

        <div className="w-full flex flex-col items-center space-y-4 pt-8">
           <ActionButton onClick={() => setIsLetterVisible(true)}>
            <LetterIcon />
            Presiona para una sorpresa
          </ActionButton>
        </div>
      </div>
      
      {isLetterVisible && (
        <TypingLetter
          content={letterContent}
          onClose={() => setIsLetterVisible(false)}
        />
      )}
    </div>
  );
};

export default App;