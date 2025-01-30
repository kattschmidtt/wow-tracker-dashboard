import React from 'react';
import {parseColor, prettyNumberFormat} from '../../util/util.ts';

interface ColoredParseProps {
  number: number;
}

const ParsedColoredText = ( {number}: ColoredParseProps ) => {
  const color = parseColor(number);

  return (
    <span style={{color}}>{prettyNumberFormat(number)}</span>
  );
}

export default ParsedColoredText;
