import React, {useState} from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Button, Grid, TextField } from '@material-ui/core';
import StepWrapper from '../../components/StepWrapper';
import MainLayout from '../../layouts/MainLayout';
import FileUpload from '../../components/FileUpload';
import { useInput } from '../../hooks/useInput';
import { useRouter } from 'next/router';
import axios from 'axios';


const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const title = useInput('');
  const artist = useInput('');
  const router = useRouter();

  const back = () => {
    setActiveStep(prev => prev - 1)
  }

  const next = () => {
    if(activeStep !== 2){
      setActiveStep(prev => prev + 1)
    } else {
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('artist', artist.value);
        formData.append('picture', picture);
        formData.append('audio', audio);
        axios.post('http://localhost:5000/tracks', formData)
          .then(resp => router.push('/tracks'))
          .catch(e => console.log(e));
    }
  }

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && 
        <Grid container direction={'column'} style={{padding: 20}}>
          <TextField
            {...title} 
            style={{marginTop: 10}} 
            label={"Track title"} 
          />
          <TextField 
            {...artist}
            style={{marginTop: 10}} 
            label={"Artist name"} 
          />
        </Grid>
        }
        {activeStep === 1 && 
          <FileUpload setFile={setPicture} accept='image/*'>
            <Button endIcon={<ArrowUpwardIcon/>}>Upload cover</Button>
          </FileUpload>
        }
        {activeStep === 2 && 
          <FileUpload setFile={setAudio} accept='audio/*'>
            <Button endIcon={<ArrowUpwardIcon/>}>Upload track</Button>
          </FileUpload>
        }
      </StepWrapper>
      <Grid container justifyContent='space-between'>
        <Button 
          disabled={activeStep === 0} 
          startIcon={<ArrowBackIosIcon/>}
          onClick={back}
        >
          Back
        </Button>
        <Button 
          endIcon={<ArrowForwardIosIcon/>}
          onClick={next}
        >
          Next
        </Button>
      </Grid>
    </MainLayout>
  )
}

export default Create
