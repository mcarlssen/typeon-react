import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { TypeWriter } from '../';

describe('TypeWriter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    render(<TypeWriter phrases={['Test']} />);
    expect(screen.getByText('_')).toBeInTheDocument();
  });

  it('types out the first phrase', () => {
    render(<TypeWriter phrases={['Hello']} baseSpeed={100} />);
    
    // Type first character
    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(screen.getByText('H_')).toBeInTheDocument();

    // Type remaining characters
    act(() => {
      jest.advanceTimersByTime(40);
    });
    expect(screen.getByText('Hello_')).toBeInTheDocument();
  });

  it('respects pauseDuration', () => {
    render(<TypeWriter phrases={['Test']} pauseDuration={1000} baseSpeed={100} />);
    
    // Type full word
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(screen.getByText('Test_')).toBeInTheDocument();

    // Should still show same text during pause
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText('Test_')).toBeInTheDocument();
  });
}); 