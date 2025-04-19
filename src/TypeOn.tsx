import React, { useState, useEffect } from 'react';

interface TypeOnProps {
  phrases: string[]; 
  baseSpeed?: number; // characters per second - default 24
  pauseDuration?: number; // milliseconds at end of phrase - default 3000
  className?: string; // default 'type-on-text'
}

const TypeOn: React.FC<TypeOnProps> = ({
  phrases,
  baseSpeed = 24,
  pauseDuration = 3000,
  className = 'type-on-text'
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentPhrase = phrases[phraseIndex];
    const shouldType = !isDeleting && text.length < currentPhrase.length;
    const shouldDelete = isDeleting && text.length > 0;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (shouldType) {
      // Types next character. 
      const nextChar = currentPhrase[text.length];
      const randomVariation = Math.random() * 0.4 + 0.8; // adds variation to type-on speed per character - default 80% to 120% of base speed
      const typeSpeed = (1000 / baseSpeed) * randomVariation;

      timeout = setTimeout(() => {
        setText(text + nextChar);
        if (text.length + 1 === currentPhrase.length) {
          setIsPaused(true);
        }
      }, typeSpeed);
    } else if (shouldDelete) {
      // Deletes phrase like backspacing. To simulate press-and-hold backspace, increase deleteSpeedto 1200-1400 and reduce randomVariation to 0
      const randomVariation = Math.random() * 0.3 + 0.85; // same as above, but for the backspace speed - default 85% to 115% of base speed
      const deleteSpeed = (1000 / baseSpeed) * randomVariation;

      timeout = setTimeout(() => {
        setText(text.slice(0, -1));
      }, deleteSpeed);
    } else if (isDeleting && text.length === 0) {
      // Move to next phrase
      setIsDeleting(false);
      setPhraseIndex((current) => (current + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, isPaused, phrases, baseSpeed, pauseDuration]);

  return (
    <span 
      className={className}
      role="text"
    >
      {text}
      <span className="cursor">_</span>
    </span>
  );
};

export default TypeOn; 