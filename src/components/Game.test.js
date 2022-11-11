import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import Game from "./Game";

const TOTAL_ITEMS = 8;
// Total number circles.

describe('Shooting Game', () => {
  it('Should render the game correctly', () => {
    render(<Game targetCount={TOTAL_ITEMS} />);
    expect(screen.getByText('Shoot the Balls')).toBeInTheDocument();
    expect(screen.getByText('Hits')).toBeInTheDocument();
    expect(screen.getByText('Select Target')).toBeInTheDocument();
    expect(screen.getByText('Shoot')).toBeInTheDocument();
  });

  it('Should show select target box and shoot button', () => {
    render(<Game targetCount={TOTAL_ITEMS} />);
    expect(screen.getByTestId('target-input')).toBeInTheDocument();
    expect(screen.getByTestId('shoot-button')).toBeInTheDocument();
  });

  it('Should show correct target elements', () => {
    render(<Game targetCount={TOTAL_ITEMS} />);
    expect(screen.getAllByRole('target').length).toEqual(TOTAL_ITEMS);
  });

  it('Should remove target on hit and moed it to hit target list', () => {
    render(<Game targetCount={TOTAL_ITEMS} />);
    const targetInput = screen.getByTestId('target-input');
    const shootButton = screen.getByTestId('shoot-button');
    expect(screen.queryByTestId('hit-target-1')).not.toBeInTheDocument();
    expect(screen.getByTestId('target-1')).toBeInTheDocument();
    fireEvent.change(targetInput, { target: { value: '1' } });
    fireEvent.click(shootButton);
    expect(screen.queryByTestId('target-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('hit-target-1')).toBeInTheDocument();
  });
});