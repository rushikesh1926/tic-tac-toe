import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Board from './App';

describe('Board component', () => {
  it('renders without crashing', () => {
    render(<Board />);
  });

  it('displays the initial status', () => {
    render(<Board />);
    expect(screen.getByText('Next Player: X')).toBeInTheDocument();
  });

  it('updates the status after a square is clicked', () => {
    render(<Board />);
    const square = screen.getByText('Next Player: X');
    fireEvent.click(square); 
    expect(screen.getByText('Next Player: O')).toBeInTheDocument();
  });

  it('declares a winner', () => {
    render(<Board />);
    const squares = [
      'X', 'O', 'X',
      'O', 'X', 'O',
      'X', 'O', 'X',
    ];

    for (let i = 0; i < squares.length; i++) {
      const square = screen.getByText('Next Player:');
      fireEvent.click(square);
    }

    expect(screen.getByText('Winner: X')).toBeInTheDocument();
  });
});

describe('calculateWinner function', () => {
  it('correctly identifies a winner', () => {
    const squares = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    const winner = Board.calculateWinner(squares);
    expect(winner).toBe('X');
  });

  it('returns null when there is no winner', () => {
    const squares = ['X', 'O', 'X', 'O', null, 'O', 'X', 'O', null];
    const winner = Board.calculateWinner(squares);
    expect(winner).toBe(null);
  });
});