import { useCallback, useMemo, useState } from 'react';

export type MapOrEntries<K, V> = Map<K, V> | [K, V][];
export type UseMapActions<K, V> = {
  delete: (keyToDelete: K) => void;
  get: (k: K) => void;
  set: (k: K, v: V) => void;
  clear: Map<K, V>['clear'];
  init: (pairsOrMap: MapOrEntries<K, V>) => void;
};

export type UseMap<K, V> = [MapOrEntries<K, V>, UseMapActions<K, V>];

export function useMap<K, V>(
  initValues: MapOrEntries<K, V> = new Map()
): UseMap<K, V> {
  const [map, setMap] = useState<Map<K, V> | [K, V][]>(
    Array.isArray(initValues) ? new Map(initValues) : initValues
  );

  const set = useCallback((key: K, value: V) => {
    setMap((aMap) => {
      const copy = new Map(aMap);
      return copy.set(key, value);
    });
  }, []);

  const get = useCallback(
    (key: K) => {
      return map instanceof Map ? map.get(key) : undefined;
    },
    [map]
  );

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
      get,
      delete: deleteByKey,
      clear,
      init,
    }),
    [clear, deleteByKey, get, init, set]
  );

  return [map, actions];
}
