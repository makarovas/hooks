import { useCallback, useMemo, useState } from 'react';

export type MapOrEntries<K, V> = Map<K, V> | [K, V][];
export type UseMapActions<K, V> = {
  delete: (keyToDelete: K) => void;
  set: (k: K, v: V) => void;
  clear: Map<K, V>['clear'];
  init: (pairsOrMap: MapOrEntries<K, V>) => void;
};

export type UseMap<K, V> = [MapOrEntries<K, V>, UseMapActions<K, V>];

export function useMap<K, V>(
  initValues: MapOrEntries<K, V> = new Map()
): UseMap<K, V> {
  const [map, setMap] = useState(
    Array.isArray(initValues) ? new Map(initValues) : initValues
  );

  const set = useCallback((key: K, value: V) => {
    setMap((aMap) => {
      const copy = new Map(aMap);
      return copy.set(key, value);
    });
  }, []);

  const deleteByKey = useCallback((key: K) => {
    setMap((_map) => {
      const copy = new Map(_map);
      copy.delete(key);
      return copy;
    });
  }, []);

  const clear = useCallback(() => {
    setMap(() => new Map());
  }, []);

  const init = useCallback(
    (mapOrTuple: MapOrEntries<K, V> = []) => new Map(mapOrTuple),
    []
  );

  const actions = useMemo(
    () => ({
      set,
      delete: deleteByKey,
      clear,
      init,
    }),
    [clear, deleteByKey, init, set]
  );

  return [map, actions];
}
