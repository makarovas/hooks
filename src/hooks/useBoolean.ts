import React, { SetStateAction, useCallback, useMemo, useState } from 'react';

type IUseCallbackActions = {
  setValue: React.Dispatch<SetStateAction<boolean>>;
  toggle: VoidFunction;
  setTrue: VoidFunction;
  setFalse: VoidFunction;
};

export type IUseBoolean = [boolean, IUseCallbackActions];

export const useBoolean = (initValue: boolean): IUseBoolean => {
  const [value, setValue] = useState(initValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  const actions = useMemo(
    () => ({ setTrue, setFalse, toggle, setValue }),
    [setFalse, setTrue, toggle]
  );

  return [value, actions];
};
