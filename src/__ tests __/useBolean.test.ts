import { act, renderHook } from '@testing-library/react';
import { useBoolean } from '../hooks';

describe('useBoolean array', () => {
  it('should set true', () => {
    const { result } = renderHook(() => useBoolean(false));
    const [, actions] = result.current;
    expect(result.current[0]).toBe(false);
    act(() => actions.setTrue());
    expect(result.current[0]).toBe(true);
  });

  it('should set false', () => {
    const { result } = renderHook(() => useBoolean(true));
    const [, actions] = result.current;
    expect(result.current[0]).toBe(true);
    act(() => actions.setFalse());
    expect(result.current[0]).toBe(false);
  });

  it('should be toggle state', () => {
    const { result } = renderHook(() => useBoolean(true));
    const [, actions] = result.current;
    expect(result.current[0]).toBe(true);
    act(() => actions.toggle());
    expect(result.current[0]).toBe(false);
    act(() => actions.toggle());
    expect(result.current[0]).toBe(true);
  });
});
