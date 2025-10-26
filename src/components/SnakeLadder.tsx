import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

export function SnakeLadder() {
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [player1Position, setPlayer1Position] = useState(1);
  const [player2Position, setPlayer2Position] = useState(1);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const [message, setMessage] = useState("Player 1's turn - Roll the dice!");
  const [gameHistory, setGameHistory] = useState<string[]>([]);

  // Snakes and Ladders positions
  const snakes = {
    16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78
  };
  
  const ladders = {
    1: 38, 4: 14, 9: 21, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100
  };

  const getDiceIcon = (value: number) => {
    const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
    return icons[value - 1];
  };

  const getPlayerPosition = (player: 1 | 2) => {
    return player === 1 ? player1Position : player2Position;
  };

  const setPlayerPosition = (player: 1 | 2, position: number) => {
    if (player === 1) {
      setPlayer1Position(position);
    } else {
      setPlayer2Position(position);
    }
  };

  const rollDice = () => {
    if (isRolling || winner) return;

    setIsRolling(true);
    let rollCount = 0;
    const maxRolls = 20;

    const rollAnimation = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rollCount++;

      if (rollCount >= maxRolls) {
        clearInterval(rollAnimation);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);
        setIsRolling(false);
        movePlayer(finalValue);
      }
    }, 100);
  };

  const movePlayer = (diceRoll: number) => {
    const currentPosition = getPlayerPosition(currentPlayer);
    let newPosition = currentPosition + diceRoll;
    
    // Can't go beyond 100
    if (newPosition > 100) {
      setMessage(`Player ${currentPlayer} rolled ${diceRoll} but can't move beyond 100!`);
      switchPlayer();
      return;
    }

    // Check for ladder
    if (ladders[newPosition as keyof typeof ladders]) {
      const ladderTop = ladders[newPosition as keyof typeof ladders];
      setMessage(`Player ${currentPlayer} rolled ${diceRoll} and climbed a ladder from ${newPosition} to ${ladderTop}! 🪜`);
      addToHistory(`Player ${currentPlayer}: Rolled ${diceRoll}, moved to ${newPosition}, climbed ladder to ${ladderTop}`);
      newPosition = ladderTop;
    }
    // Check for snake
    else if (snakes[newPosition as keyof typeof snakes]) {
      const snakeTail = snakes[newPosition as keyof typeof snakes];
      setMessage(`Player ${currentPlayer} rolled ${diceRoll} and got bitten by a snake! Slid from ${newPosition} to ${snakeTail}! 🐍`);
      addToHistory(`Player ${currentPlayer}: Rolled ${diceRoll}, moved to ${newPosition}, slid down snake to ${snakeTail}`);
      newPosition = snakeTail;
    }
    // Normal move
    else {
      setMessage(`Player ${currentPlayer} rolled ${diceRoll} and moved to ${newPosition}`);
      addToHistory(`Player ${currentPlayer}: Rolled ${diceRoll}, moved to ${newPosition}`);
    }

    setPlayerPosition(currentPlayer, newPosition);

    // Check for winner
    if (newPosition === 100) {
      setWinner(currentPlayer);
      setMessage(`🎉 Player ${currentPlayer} wins! 🎉`);
      addToHistory(`Player ${currentPlayer} wins the game!`);
      return;
    }

    // Switch player
    setTimeout(() => {
      switchPlayer();
    }, 2000);
  };

  const switchPlayer = () => {
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    setCurrentPlayer(nextPlayer);
    setMessage(`Player ${nextPlayer}'s turn - Roll the dice!`);
  };

  const addToHistory = (entry: string) => {
    setGameHistory(prev => [entry, ...prev.slice(0, 9)]);
  };

  const resetGame = () => {
    setCurrentPlayer(1);
    setPlayer1Position(1);
    setPlayer2Position(1);
    setDiceValue(null);
    setIsRolling(false);
    setWinner(null);
    setMessage("Player 1's turn - Roll the dice!");
    setGameHistory([]);
  };

  const getBoardPosition = (position: number) => {
    const row = Math.floor((position - 1) / 10);
    const col = (position - 1) % 10;
    
    // Snake and ladder board has alternating row directions
    const actualCol = row % 2 === 0 ? col : 9 - col;
    const actualRow = 9 - row;
    
    return { row: actualRow, col: actualCol };
  };

  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        const position = (9 - i) * 10 + (i % 2 === 0 ? j + 1 : 10 - j);
        const isPlayer1 = player1Position === position;
        const isPlayer2 = player2Position === position;
        const hasSnake = snakes[position as keyof typeof snakes];
        const hasLadder = ladders[position as keyof typeof ladders];
        
        row.push(
          <div
            key={position}
            className={`
              w-8 h-8 border border-border text-xs flex items-center justify-center relative
              ${hasSnake ? 'bg-red-100' : hasLadder ? 'bg-green-100' : 'bg-background'}
              ${position === 100 ? 'bg-yellow-200' : ''}
            `}
          >
            <span className="absolute top-0 left-0 text-[8px] text-muted-foreground">
              {position}
            </span>
            {hasSnake && <span className="text-red-500">🐍</span>}
            {hasLadder && <span className="text-green-500">🪜</span>}
            {isPlayer1 && <span className="text-blue-600 font-bold">1</span>}
            {isPlayer2 && <span className="text-red-600 font-bold">2</span>}
          </div>
        );
      }
      board.push(
        <div key={i} className="flex">
          {row}
        </div>
      );
    }
    return board;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Snake &amp; Ladder</h2>
        <p className="text-muted-foreground">First to reach 100 wins!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Game Board */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Game Board</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="inline-block p-2 bg-muted rounded">
                {renderBoard()}
              </div>
            </div>
            <div className="mt-4 text-xs text-center text-muted-foreground">
              <p>🐍 = Snake | 🪜 = Ladder | 1 = Player 1 | 2 = Player 2</p>
            </div>
          </CardContent>
        </Card>

        {/* Game Controls */}
        <div className="space-y-4">
          {/* Player Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Player Status</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center items-center space-x-8 mb-4">
                <div className={`p-3 rounded ${currentPlayer === 1 ? 'bg-blue-100' : 'bg-muted'}`}>
                  <div className="text-xl font-bold text-blue-600">{player1Position}</div>
                  <div className="text-sm text-muted-foreground">Player 1</div>
                </div>
                <div className={`p-3 rounded ${currentPlayer === 2 ? 'bg-red-100' : 'bg-muted'}`}>
                  <div className="text-xl font-bold text-red-600">{player2Position}</div>
                  <div className="text-sm text-muted-foreground">Player 2</div>
                </div>
              </div>
              
              {winner && (
                <Badge variant="default" className="text-lg py-2 px-4 mb-4">
                  🎉 Player {winner} Wins! 🎉
                </Badge>
              )}
              
              <div className="text-sm text-muted-foreground mb-4">
                {message}
              </div>
            </CardContent>
          </Card>

          {/* Dice */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Dice</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                {diceValue && (
                  <div className="flex justify-center mb-4">
                    {(() => {
                      const DiceIcon = getDiceIcon(diceValue);
                      return <DiceIcon className="w-16 h-16 text-primary" />;
                    })()}
                  </div>
                )}
              </div>
              
              <Button
                onClick={rollDice}
                disabled={isRolling || !!winner}
                className="mb-4"
              >
                {isRolling ? 'Rolling...' : 'Roll Dice'}
              </Button>
              
              <div className="space-x-2">
                <Button onClick={resetGame} variant="outline">
                  New Game
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Game History */}
          {gameHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Game History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-48 overflow-y-auto">
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
      </div>
    </div>
  );
}