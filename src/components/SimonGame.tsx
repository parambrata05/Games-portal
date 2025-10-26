import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

type Color = 'red' | 'blue' | 'green' | 'yellow';

export function SimonGame() {
  const [sequence, setSequence] = useState<Color[]>([]);
  const [playerSequence, setPlayerSequence] = useState<Color[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activeColor, setActiveColor] = useState<Color | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'game-over'>('idle');
  const [message, setMessage] = useState('Press Start to begin!');

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const colors: { color: Color; className: string }[] = [
    { color: 'red', className: 'bg-red-500 hover:bg-red-600' },
    { color: 'blue', className: 'bg-blue-500 hover:bg-blue-600' },
    { color: 'green', className: 'bg-green-500 hover:bg-green-600' },
    { color: 'yellow', className: 'bg-yellow-500 hover:bg-yellow-600' }
  ];

  const getRandomColor = (): Color => {
    const colors: Color[] = ['red', 'blue', 'green', 'yellow'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const playSound = (color: Color) => {
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const frequencies = {
      red: 220,
      blue: 277,
      green: 330,
      yellow: 415
    };
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequencies[color];
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const showSequence = async (seq: Color[]) => {
    setIsShowingSequence(true);
    setMessage('Watch the sequence...');
    
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => {
        timeoutRef.current = setTimeout(() => {
          setActiveColor(seq[i]);
          playSound(seq[i]);
          resolve(void 0);
        }, i === 0 ? 1000 : 600);
      });
      
      await new Promise(resolve => {
        timeoutRef.current = setTimeout(() => {
          setActiveColor(null);
          resolve(void 0);
        }, 400);
      });
    }
    
    setIsShowingSequence(false);
    setMessage('Your turn! Repeat the sequence.');
  };

  const startGame = () => {
    const newSequence = [getRandomColor()];
    setSequence(newSequence);
    setPlayerSequence([]);
    setIsPlaying(true);
    setGameState('playing');
    setScore(0);
    showSequence(newSequence);
  };

  const handleColorClick = (color: Color) => {
    if (!isPlaying || isShowingSequence) return;

    playSound(color);
    setActiveColor(color);
    setTimeout(() => setActiveColor(null), 200);

    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    // Check if the player's input matches the sequence so far
    const currentIndex = newPlayerSequence.length - 1;
    
    if (newPlayerSequence[currentIndex] !== sequence[currentIndex]) {
      // Wrong input - game over
      setGameState('game-over');
      setMessage('Game Over! Wrong sequence.');
      setIsPlaying(false);
      if (score > highScore) {
        setHighScore(score);
      }
      return;
    }

    // Check if player completed the sequence
    if (newPlayerSequence.length === sequence.length) {
      // Correct sequence completed
      const newScore = score + 1;
      setScore(newScore);
      setPlayerSequence([]);
      
      // Add new color to sequence
      const newSequence = [...sequence, getRandomColor()];
      setSequence(newSequence);
      setMessage(`Great! Level ${newScore + 1}`);
      
      // Show next sequence after a short delay
      setTimeout(() => {
        showSequence(newSequence);
      }, 1000);
    }
  };

  const resetGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setIsPlaying(false);
    setIsShowingSequence(false);
    setActiveColor(null);
    setScore(0);
    setGameState('idle');
    setMessage('Press Start to begin!');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Simon Says</h2>
        <p className="text-muted-foreground">Remember and repeat the sequence!</p>
      </div>

      {/* Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Score</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center items-center space-x-8">
            <div>
              <div className="text-2xl font-bold text-blue-600">{score}</div>
              <div className="text-sm text-muted-foreground">Current</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{highScore}</div>
              <div className="text-sm text-muted-foreground">High Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Status */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <Badge 
              variant={gameState === 'game-over' ? 'destructive' : gameState === 'playing' ? 'default' : 'secondary'}
              className="text-lg py-2 px-4"
            >
              {message}
            </Badge>
          </div>

          {/* Game Board */}
          <div className="flex justify-center mb-6">
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              {colors.map(({ color, className }) => (
                <button
                  key={color}
                  onClick={() => handleColorClick(color)}
                  className={`
                    w-24 h-24 rounded-lg transition-all duration-200 transform active:scale-95
                    ${className}
                    ${activeColor === color ? 'scale-110 brightness-150' : ''}
                    ${!isPlaying || isShowingSequence ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                  `}
                  disabled={!isPlaying || isShowingSequence}
                />
              ))}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center space-x-4">
            {gameState === 'idle' || gameState === 'game-over' ? (
              <Button onClick={startGame} className="px-8">
                {gameState === 'idle' ? 'Start Game' : 'Play Again'}
              </Button>
            ) : (
              <Button onClick={resetGame} variant="outline">
                Reset Game
              </Button>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Watch the sequence, then click the colors in the same order.</p>
            <p>Each round adds one more color to remember!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}