import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Switch } from './components/ui/switch';
import { RockPaperScissors } from './components/RockPaperScissors';
import { TicTacToe } from './components/TicTacToe';
import { SimonGame } from './components/SimonGame';
import { SnakeLadder } from './components/SnakeLadder';
import { ArrowLeft, Gamepad2, Scissors, Grid3x3, Brain, Dices, Sun, Moon } from 'lucide-react';

type GameType = 'home' | 'rock-paper-scissors' | 'tic-tac-toe' | 'simon' | 'snake-ladder';

export default function App() {
  const [currentGame, setCurrentGame] = useState<GameType>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPreference);
    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  const games = [
    {
      id: 'rock-paper-scissors' as GameType,
      title: 'Rock Paper Scissors',
      description: 'Classic hand game against computer',
      icon: Scissors,
      color: 'bg-red-500'
    },
    {
      id: 'tic-tac-toe' as GameType,
      title: 'Tic-tac-toe',
      description: 'Three in a row wins!',
      icon: Grid3x3,
      color: 'bg-blue-500'
    },
    {
      id: 'simon' as GameType,
      title: 'Simon Says',
      description: 'Remember the sequence of colors',
      icon: Brain,
      color: 'bg-green-500'
    },
    {
      id: 'snake-ladder' as GameType,
      title: 'Snake & Ladder',
      description: 'Roll dice and climb to 100',
      icon: Dices,
      color: 'bg-purple-500'
    }
  ];

  const renderGame = () => {
    switch (currentGame) {
      case 'rock-paper-scissors':
        return <RockPaperScissors />;
      case 'tic-tac-toe':
        return <TicTacToe />;
      case 'simon':
        return <SimonGame />;
      case 'snake-ladder':
        return <SnakeLadder />;
      default:
        return null;
    }
  };

  if (currentGame !== 'home') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          {/* Theme toggle at the top */}
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="outline"
              onClick={() => setCurrentGame('home')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Games
            </Button>
            <div className="flex items-center space-x-3">
              <Sun className="h-4 w-4" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleTheme}
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>
          {renderGame()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Theme toggle at the top */}
        <div className="flex justify-end mb-8">
          <div className="flex items-center space-x-3">
            <Sun className="h-4 w-4" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
            />
            <Moon className="h-4 w-4" />
          </div>
        </div>
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Gamepad2 className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl font-bold text-foreground">Game Hub</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Choose your favorite game and start playing!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => {
            const Icon = game.icon;
            return (
              <Card
                key={game.id}
                className="cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
                onClick={() => setCurrentGame(game.id)}
              >
                <CardHeader className="text-center">
                  <div className={`${game.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>{game.title}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full">
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}