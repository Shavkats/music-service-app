/* eslint-disable @next/next/no-img-element */
import React, {useState} from 'react';
import {ITrack} from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import {Button, Grid, TextField} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import axios from "axios";
import {useInput} from "../../hooks/useInput";

const TrackPage = ({serverTrack}) => {
  const [track, setTrack] = useState<ITrack>(serverTrack)
  const router = useRouter()
  const username = useInput('')
  const text = useInput('')

  const addComment = async () => {
      try {
          const response = await axios.post('http://localhost:5000/tracks/comment', {
              username: username.value,
              text: text.value,
              trackId: track._id
          })
          setTrack({...track, comments: [...track.comments, response.data]})
      } catch (e) {
          console.log(e)
      }

      username.value = '';
      text.value = '';
  }

  return (
      <MainLayout
        title={"Music platform - " + track.title + " - " + track.artist}
        keywords={'Music, artists, ' + track.title + ", " + track.artist}
      >
        <Button 
        variant='contained' 
        color='primary' 
        startIcon={<ArrowBackIcon/>}
        onClick={() => router.push('/tracks')}
        >
            Back to tracks
        </Button>
        <Grid container style={{margin: '20px 0'}}>
            <img alt="" src={'http://localhost:5000/' + track.picture} width={200} height={200}/>
            <div style={{marginLeft: 30}}>
                <h2>Track title - {track.title}</h2>
                <h2>Artist - {track.artist}</h2>
                <h2>Listens - {track.listens}</h2>
            </div>
        </Grid>
        <h2>Comments</h2>
        <Grid container>
            <TextField
                label="Your name"
                fullWidth
                {...username}
            />
            <TextField
                label="Comments"
                {...text}
                fullWidth
                multiline
                rows={4}
            />
            <Button 
                variant='contained' 
                color='primary'
                style={{marginTop: '10px', marginBottom: '10px'}} 
                onClick={addComment}
            >
                Add a comment
            </Button>
        </Grid>
        <div>
            {track.comments.map(comment =>
                <div key={comment._id}>
                    <div>{comment.username}: {comment.text}</div>
                </div>
            )}
        </div>
      </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const response = await axios.get('http://localhost:5000/tracks/' + params.id)
  return {
      props: {
          serverTrack: response.data
      }
  }
}