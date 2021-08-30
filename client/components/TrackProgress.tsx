import React, {FC} from 'react';

interface TrackProgessProps {
  left: number;
  right: number;
  onChange: (e) => void;
}

const TrackProgress: FC<TrackProgessProps> = ({left, right, onChange}) => {
  return (
    <div>
      <input 
        type='range'
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
      <div>{left} / {right}</div>
    </div>
  )
}

export default TrackProgress
