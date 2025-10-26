import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

type Player = 'X' | 'O';
type Board = (Player | null)[];

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (board: Board): Player | 'draw' | null => {
    // Check for winner
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] as Player;
      }
    }

    // Check for draw
    if (board.every(cell => cell !== null)) {
      return 'draw';
    }

    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      // Update score
      if (gameResult === 'X' || gameResult === 'O') {
        setScore(prev => ({ ...prev, [gameResult]: prev[gameResult] + 1 }));
      } else {
        setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
      }
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const resetScore = () => {
    setScore({ X: 0, O: 0, draws: 0 });
    resetGame();
  };

  const getCellClassName = (index: number) => {
    let className = "w-20 h-20 border-2 border-border text-2xl font-bold hover:bg-accent transition-colors";
    
    if (index % 3 !== 2) className += " border-r-2";
    if (index < 6) className += " border-b-2";
    
    return className;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Tic-tac-toe</h2>
        <p className="text-muted-foreground">Get three in a row to win!</p>
      </div>

      {/* Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Score</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center items-center space-x-8">
            <div>
              <div className="text-2xl font-bold text-blue-600">{score.X}</div>
              <div className="text-sm text-muted-foreground">Player X</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{score.draws}</div>
              <div className="text-sm text-muted-foreground">Draws</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{score.O}</div>
              <div className="text-sm text-muted-foreground">Player O</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Status */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            {winner ? (
              <Badge 
                variant={winner === 'draw' ? 'secondary' : 'default'}
                className="text-lg py-2 px-4"
              >
                {winner === 'draw' ? '🤝 It\'s a Draw!' : `🎉 Player ${winner} Wins!`}
              </Badge>
            ) : (
              <div className="text-lg">
                Current Player: <span className="font-bold text-primary">Player {currentPlayer}</span>
              </div>
            )}
          </div>

          {/* Game Board */}
          <div className="flex justify-center mb-6">
            <div className="grid grid-cols-3 gap-0 border-2 border-border rounded">
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleCellClick(index)}
                  className={getCellClassName(index)}
                  disabled={!!winner}
                >
                  {cell && (
                    <span className={cell === 'X' ? 'text-blue-600' : 'text-red-600'}>
                      {cell}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center space-x-4">
            <Button onClick={resetGame} variant="outline">
              New Game
            </Button>
            <Button onClick={resetScore} variant="secondary">
              Reset Score
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}