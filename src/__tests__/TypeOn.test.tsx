import React from 'react';
import { render, screen, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TypeOn } from '../';

describe('TypeOn', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
    cleanup(); // Clean up after each test
  });

  it('renders without crashing', () => {
    render(<TypeOn phrases={['Test']} />);
    expect(screen.getByText('_')).toBeInTheDocument();
  });

  it('types out the first phrase', () => {
    render(<TypeOn phrases={['Hello']} baseSpeed={100} />);
    const container = screen.getByRole('text');
    
    // Advance time until we see the full word
    let attempts = 0;
    while (!container.textContent?.includes('Hello') && attempts < 100) {
      act(() => {
        jest.advanceTimersByTime(10);
      });
      attempts++;
    }
    
    expect(container).toHaveTextContent('Hello');
  });

  it('respects pauseDuration', () => {
    render(<TypeOn phrases={['Test']} pauseDuration={1000} baseSpeed={100} />);
    const container = screen.getByRole('text');
    
    // Type the full word
    let attempts = 0;
    while (!container.textContent?.includes('Test') && attempts < 100) {
      act(() => {
        jest.advanceTimersByTime(10);
      });
      attempts++;
    }
    
    expect(container).toHaveTextContent('Test');
    
    // Check that text remains during pause
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(container).toHaveTextContent('Test');
  });

  it('deletes text after pause', () => {
    render(<TypeOn phrases={['Test']} pauseDuration={1000} baseSpeed={100} />);
    
    // Type the word
    for (let i = 0; i < 40; i++) {
      act(() => {
        jest.advanceTimersByTime(10);
      });
    }
    
    // Wait for pause duration
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Start deleting
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    const container = screen.getByRole('text');
    expect(container.textContent).not.toBe('Test_');
  });

  it('completes a full type-pause-delete cycle', () => {
    render(<TypeOn phrases={['Hi']} pauseDuration={1000} baseSpeed={100} />);
    const container = screen.getByRole('text');
    
    // Wait for typing to complete
    let attempts = 0;
    while (!container.textContent?.includes('Hi') && attempts < 100) {
      act(() => {
        jest.advanceTimersByTime(10);
      });
      attempts++;
    }
    
    expect(container).toHaveTextContent('Hi');
    
    // Wait for pause
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Wait for deletion to complete
    attempts = 0;
    while (container.textContent !== '_' && attempts < 200) {
      act(() => {
        jest.advanceTimersByTime(10);
      });
      attempts++;
    }
    
    expect(container.textContent).toBe('_');
  });

  // New approach to test randomness
  it('applies random timing variations', () => {
    // Mock Math.random to verify it's being called
    const mockRandom = jest.spyOn(Math, 'random');
    
    render(<TypeOn phrases={['A']} baseSpeed={100} pauseDuration={0} />);
    const container = screen.getByRole('text');
    
    // Advance time to trigger at least one character typing
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // Verify Math.random was called for timing variation
    expect(mockRandom).toHaveBeenCalled();
    
    // Clean up
    mockRandom.mockRestore();
  });
}); 