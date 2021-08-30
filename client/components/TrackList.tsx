import { Grid, Box } from '@material-ui/core'
import React, {FC} from 'react'
import TrackItem from "./TrackItem";
import { ITrack } from '../types/track'

interface TrackListProps {
  tracks: ITrack[]
}

const TrackList: FC<TrackListProps> = ({tracks}) => {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map(track => 
          <TrackItem 
           key={track._id}
           track={track}
          />  
        )}
      </Box>
    </Grid>
  )
}

export default TrackList
