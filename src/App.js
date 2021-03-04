
import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NProgress from 'nprogress'; 
import { WhatsappShareButton, WhatsappIcon } from "react-share";

const  App = () => {
  const [joke,setJoke] = useState("");
  
  const [setup, setSetup] = useState("");
  const [delivery, setDelivery] = useState("");
  const [type, setType] = useState("");



  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  const API = async () =>{
    NProgress.start();
    let allJokes = [];

    try {
      const jokeData = axios.get("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=religious,racist,explicit");
      allJokes = (await jokeData).data;
    } catch (error) {
      console.log(error);
    }


    try {
        setType(allJokes.type);
        setSetup(allJokes.setup);
        setDelivery(allJokes.delivery);
        setJoke(allJokes.joke);   
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    API();
    
  },[])

 
NProgress.done();

  const classes = useStyles();
  

  return (
    

<Container>
<Card className={classes.root} color="secondary">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Joke of the Day
        </Typography>
        
       
       
        {
          type === 'twopart' ? (<Typography variant="body2" component="p">
            {setup}
            <br />
        {delivery}
        </Typography>) : (<Typography variant="body2" component="p">{joke}</Typography>)
        
    }
     
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined"  color="secondary" onClick={API}>Hit me with a joke</Button>
      </CardActions>

      <Typography className={classes.title} color="textSecondary" gutterBottom>Share the joke</Typography>
      <WhatsappShareButton
        url="https://dazzling-northcutt-50209b.netlify.app/"
        quote={joke}
        title="#programing joke">
        <WhatsappIcon  size={32} round={true} logoFillColor="white" />
      </WhatsappShareButton>
    </Card>
    </Container>




  );
}

export default App;
