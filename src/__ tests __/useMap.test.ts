import { act, renderHook } from '@testing-library/react-hooks';
import { useMap } from '../hooks/useMap';

describe('useMap array', () => {
  describe('set', () => {
    it('should update old value', () => {
      // given
      const { result } = renderHook(() =>
        useMap<number, string>([[1, 'default']])
      );
      const [map, actions] = result.current;
      expect(map instanceof Map ? map.get(1) : undefined).toBe('default');
      // when
      act(() => actions.set(1, 'changed'));
      // then
      expect(map instanceof Map ? map.get(1) : undefined).toBe('changed');
    });
    it('should add new value', () => {
      // given
      const { result } = renderHook(() => useMap<number, string>());
      const [map, actions] = result.current;
      expect(map instanceof Map ? map.get(1) : undefined).toBeUndefined();
      // when
      act(() => actions.set(1, 'added'));
      // then
      expect(map instanceof Map ? map.get(1) : undefined).toBe('added');
    });
  });

  describe('delete', () => {
    it('should delete existing value', () => {
      // given
      const { result } = renderHook(() =>
        useMap<number, string>([[1, 'existing']])
      );
      const [map, actions] = result.current;
      expect(map instanceof Map ? map.get(1) : undefined).toBe('existing');
      // when
      act(() => actions.delete(1));
      // then
      expect(map instanceof Map ? map.get(1) : undefined).toBeUndefined();
    });
  });

  describe('init', () => {
    it.each`
      message    | input
      ${'map'}   | ${new Map([[1, 'initialized']])}
      ${'tuple'} | ${[[1, 'initialized']]}
    `('initializes with $message', ({ input }) => {
      // given
      const { result } = renderHook(() => useMap<number, string>());
      const [map, actions] = result.current;
      expect(map instanceof Map ? map.get(1) : undefined).toBeUndefined();
      // when
      act(() => actions.init(input));
      // then
      expect(map instanceof Map ? map.get(1) : undefined).toBe('initialized');
    });
  });

  describe('clear', () => {
    it('clears the map state and gets values', () => {
      // given
      const { result } = renderHook(() =>
        useMap<number, string>([[1, 'initialized']])
      );
      const [map, actions] = result.current;
      expect(map instanceof Map ? map.get(1) : undefined).toBe('initialized');
      // when
      act(() => actions.clear());
      // then
      expect(map instanceof Map ? map.get(1) : undefined).toBeUndefined();
    });
  });

  describe('hooks optimizations', () => {
    it('should change value reference equality after change', () => {
      // given
      const { result } = renderHook(() => useMap<number, number>());
      const [originalValueReference, actions] = result.current;
      expect(result.current[0]).toBe(originalValueReference);
      // when
      act(() => actions.set(1, 1));
      // then
      const updatedValueReference = result.current[0];
      expect(originalValueReference).not.toBe(updatedValueReference);
      expect(
        originalValueReference instanceof Map
          ? originalValueReference.get(1)
          : undefined
      ).toBeUndefined();
      expect(
        updatedValueReference instanceof Map
          ? updatedValueReference.get(1)
          : undefined
      ).toBe(1);
    });

    it('should keep actions reference equality after value change', () => {
      // given
      const { result } = renderHook(() => useMap<number, number>());
      const [, originalActionsReference] = result.current;
      expect(result.current[1]).toBe(originalActionsReference);
      // when
      act(() => originalActionsReference.set(1, 1));
      // then
      expect(originalActionsReference).toBe(result.current[1]);
    });
  });
});
