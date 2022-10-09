import * as React from 'react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

//332d91c46a80fb4d46fe309ab040cd6d

import './Web3ModalComponent.scss';

export interface IMyComponentProps {
  counter: number;
  onClick?: () => void;
}



export const Web3ModalComponent: FunctionComponent<IMyComponentProps> = (props: IMyComponentProps) => {

  const timerHandle = useRef<number | null>(null);
  const [stateCounter, setStateCounter] = useState(42);

  useEffect(() => {
    timerHandle.current = +setInterval(() => {
      setStateCounter(stateCounter + 1);
    }, 2500);

    return () => {
      if (timerHandle.current) {
        clearInterval(timerHandle.current);
        timerHandle.current = null;
      }
    };
  });

  const {counter: propsCounter, onClick} = props;

  const handleClick = () => {
    console.log("handling click")
    if (onClick) {
      onClick();
    }
  };

  return <div className={`my-graph-component`}>
    <div className={'comp-props'}>Props counter: {propsCounter}
      <span onClick={handleClick}
            className={'increase-button'}>click to increase</span>
    </div>
    <div className={'comp-state'}>State counter: {stateCounter}</div>
  </div>;
};