import React from 'react';

type IDummy = {
  setTrue: VoidFunction;
};

export const Dummy = React.memo(({ setTrue }: IDummy) => {
  return <div onClick={() => setTrue()}>{`Dummy ${new Date().getTime()}`}</div>;
});
