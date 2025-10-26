import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

type Choice = 'rock' | 'paper' | 'scissors';
type Result = 'win' | 'lose' | 'draw';

export function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [gameHistory, setGameHistory] = useState<string[]>([]);

  const choices: { value: Choice; emoji: string; label: string }[] = [
    { value: 'rock', emoji: '🪨', label: 'Rock' },
    { value: 'paper', emoji: '📄', label: 'Paper' },
    { value: 'scissors', emoji: '✂️', label: 'Scissors' }
  ];

  const getRandomChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex].value;
  };

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) return 'draw';
    
    const winConditions = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    };
    
    return winConditions[player] === computer ? 'win' : 'lose';
  };

  const playGame = (choice: Choice) => {
    const computerChoice = getRandomChoice();
    const gameResult = determineWinner(choice, computerChoice);
    
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    setResult(gameResult);
    
    // Update score
    if (gameResult === 'win') {
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else if (gameResult === 'lose') {
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
    }
    
    // Add to history
    const historyEntry = `You: ${choice} vs Computer: ${computerChoice} - ${gameResult === 'win' ? 'You Win!' : gameResult === 'lose' ? 'Computer Wins!' : 'Draw!'}`;
    setGameHistory(prev => [historyEntry, ...prev.slice(0, 4)]);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ player: 0, computer: 0 });
    setGameHistory([]);
  };

  const getChoiceEmoji = (choice: Choice | null) => {
    if (!choice) return '❓';
    return choices.find(c => c.value === choice)?.emoji || '❓';
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Rock Paper Scissors</h2>
        <p className="text-muted-foreground">Choose your weapon and beat the computer!</p>
      </div>

      {/* Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Score</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center items-center space-x-8">
            <div>
              <div className="text-2xl font-bold text-blue-600">{score.player}</div>
              <div className="text-sm text-muted-foreground">You</div>
            </div>
            <div className="text-2xl font-bold text-muted-foreground">-</div>
            <div>
              <div className="text-2xl font-bold text-red-600">{score.computer}</div>
              <div className="text-sm text-muted-foreground">Computer</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Area */}
      <Card>
        <CardContent className="p-6">
          {/* Choices Display */}
          <div className="flex justify-center items-center space-x-12 mb-6">
            <div className="text-center">
              <div className="text-6xl mb-2">{getChoiceEmoji(playerChoice)}</div>
              <div className="text-sm text-muted-foreground">Your Choice</div>
            </div>
            <div className="text-4xl text-muted-foreground">VS</div>
            <div className="text-center">
              <div className="text-6xl mb-2">{getChoiceEmoji(computerChoice)}</div>
              <div className="text-sm text-muted-foreground">Computer</div>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="text-center mb-6">
              <Badge 
                variant={result === 'win' ? 'default' : result === 'lose' ? 'destructive' : 'secondary'}
                className="text-lg py-2 px-4"
              >
                {result === 'win' ? '🎉 You Win!' : result === 'lose' ? '😢 Computer Wins!' : '🤝 It\'s a Draw!'}
              </Badge>
            </div>
          )}

          {/* Choice Buttons */}
          <div className="flex justify-center space-x-4 mb-6">
            {choices.map((choice) => (
              <Button
                key={choice.value}
                onClick={() => playGame(choice.value)}
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
              >
                <span className="text-3xl mb-2">{choice.emoji}</span>
                <span>{choice.label}</span>
              </Button>
            ))}
          </div>

          {/* Reset Button */}
          <div className="text-center">
            <Button onClick={resetGame} variant="secondary">
              Reset Game
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Game History */}
      {gameHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Games</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {gameHistory.map((entry, index) => (
                <div key={index} className="text-sm text-muted-foreground p-2 bg-muted rounded">
                  {entry}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}