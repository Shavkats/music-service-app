import React, {useState} from 'react';
import MainLayout from '../../layouts/MainLayout';
import {Box, Button, Card, Grid, TextField, Typography} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useRouter} from 'next/router';
import TrackList from '../../components/TrackList';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {NextThunkDispatch, wrapper} from '../../store';
import {fetchTracks, searchTracks} from '../../store/actions-creators/track';
import { useDispatch } from 'react-redux';
import 'fontsource-roboto';

const Index = () => {
  const router = useRouter();
  const {tracks, error} = useTypedSelector(state => state.track);
  const [query, setQuery] = useState<string>('');
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch() as NextThunkDispatch;

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if(timer){
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value));
      }, 500)
    )
    await dispatch(await searchTracks(e.target.value));
  }

  if (error) {
      return <MainLayout>
          <h1>{error}</h1>
      </MainLayout>
  }

  return (
    <MainLayout>
      <Grid container justifyContent='center'>
        <Card style={{width: 900}}>
          <Box p={3}>
            <Grid container justifyContent='space-between' alignItems='center'>
              <Button 
                variant='contained' 
                color='primary' 
                startIcon={<ArrowBackIcon/>}
                onClick={() => router.push('/')}
                >
                  Back to main
              </Button>
              <Typography variant='h3' color='primary'>
                Track list
              </Typography>
              <Button 
                variant='contained' 
                color='primary' 
                endIcon={<ArrowUpwardIcon/>}
                onClick={() => router.push('/tracks/create')}
                >
                  Upload a track
              </Button>
            </Grid>
          </Box>
          <TextField onChange={search} placeholder='Search for a track' fullWidth value={query}/>
          <TrackList tracks={tracks}/>
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTracks());
});