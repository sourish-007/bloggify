import React, { useState, useEffect, useRef } from 'react';

const TypewriterEffect = ({ darkMode }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rightBracePosition, setRightBracePosition] = useState(0);
  const textRef = useRef(null);
  
  const phrases = [
    'Building the future with code. Sharing knowledge with passionate developers. Creating amazing experiences for everyone. Innovating with cutting-edge technology. Writing stories that inspire and matter. Designing seamless user interfaces and impactful digital experiences. Crafting elegant solutions that drive progress in the tech industry. Collaborating across teams to bring ideas to life. The future of technology is built on teamwork and dedication.',
    'Transforming ideas into reality. Collaborating on groundbreaking projects. Solving complex problems with elegant solutions. Designing interfaces that delight users. Bringing imagination to life through code. Embracing the challenges that come with innovation. Pushing the limits of creativity and technology. Coding with passion and purpose to build tomorrow’s applications today.',
    'Crafting digital experiences that amaze. Exploring the frontiers of technology. Pushing boundaries of what\'s possible. Building communities around shared passions. Turning concepts into tangible innovations. Creating software that makes a difference. Delivering products that users love and businesses trust. Constantly evolving with the digital world.'
  ];

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    const speed = isDeleting ? 30 : 60;
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1));
        
        if (text === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 3000);
        }
      } else {
        setText(currentPhrase.substring(0, text.length - 1));
        
        if (text === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, speed);
    
    return () => clearTimeout(timer);
  }, [text, isDeleting, currentIndex]);

  useEffect(() => {
    if (textRef.current) {
      if (text.length === 0) {
        setRightBracePosition(0);
      } else {
        const textWidth = textRef.current.offsetWidth;
        setRightBracePosition(textWidth);
      }
    }
  }, [text]);

  return (
    <div className="relative flex items-center justify-center h-80 md:h-96">
      <div className="relative mx-auto max-w-lg w-full px-8">
        <div 
          className={`text-6xl md:text-8xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'} absolute`}
          style={{ left: 0, top: '10px' }}
        >
          {'{'}
        </div>
        
        <div 
          ref={textRef}
          className={`font-mono text-lg whitespace-pre-wrap text-left mx-auto ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
          style={{ marginLeft: '30px', marginRight: '30px' }}
        >
          {text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
          <span className={`animate-pulse ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>|</span>
        </div>
        
        <div 
          className={`text-6xl md:text-8xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'} absolute`}
          style={{ 
            left: `${rightBracePosition + 40}px`, 
            bottom: '10px',
            transform: 'translateY(50%)',
            transition: 'left 0.3s ease-out'
          }}
        >
          {'}'}
        </div>
      </div>
    </div>
  );
};

export default TypewriterEffect;