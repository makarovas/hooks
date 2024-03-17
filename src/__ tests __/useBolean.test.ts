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
});
