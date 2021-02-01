
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

const  App = () => {
  const [joke,setJoke] = useState("");
  const [category, setCategory] = useState("");
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
    let allJokes = [];

    try {
      const jokeData = axios.get("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=religious,racist,explicit");
      console.log(jokeData);
      allJokes = (await jokeData).data
    } catch (error) {
      console.log(error);
    }


    try {
      //console.log(allJokes.type == 'twopart');
        setType(allJokes.type);
        setSetup(allJokes.setup);
        setDelivery(allJokes.delivery);
        setJoke(allJokes.joke);
        setCategory(allJokes.category);
   
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    API();
  },[])

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    

<Container>
<Card className={classes.root}>
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
        <Button size="small" variant="outlined" color="secondary" onClick={API}>Make Me Laugh</Button>
      </CardActions>
    </Card>
    </Container>




  );
}

export default App;
