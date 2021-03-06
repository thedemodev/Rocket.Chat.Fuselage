import React, { useRef, useCallback } from 'react';
import {
  Button,
  PositionAnimated,
  Options,
  Icon,
  useCursor,
} from '@rocket.chat/fuselage';

import { useBlockContext } from './hooks';

const convertOptions = (options, parser) => options.map(({ text, value }) => [value, parser(text)]);

export const Overflow = ({ context, options, parser, ...element }) => {
  const [{ loading }, action] = useBlockContext(element, context);

  const fireChange = ([value]) => action({ target: { value } });
  const convertedOptions = convertOptions(options, parser.text);
  const [cursor, handleKeyDown, handleKeyUp, reset, [visible, hide, show]] = useCursor(-1, convertedOptions, (args, [, hide]) => {
    fireChange(args);
    reset();
    hide();
  });

  const ref = useRef();
  const onClick = useCallback(() => ref.current.focus() & show(), []);

  const handleSelection = useCallback((...args) => {
    fireChange(...args);
    reset();
    hide();
  }, []);
  return (
    <>
      <Button
        ref={ref}
        small
        ghost
        onClick={onClick}
        onBlur={hide}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        mod-loading={loading}
      >
        <Icon name='kebab' size={20} />
      </Button>
      <PositionAnimated
        width='auto'
        visible={visible}
        anchor={ref}
        placement='bottom right'
      >
        <Options
          onSelect={handleSelection}
          options={convertOptions(options, parser.text)}
          cursor={cursor}
        />
      </PositionAnimated>
    </>
  );
};
