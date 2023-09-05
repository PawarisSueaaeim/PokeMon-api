import * as React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const CardItem = (props) => {
  const [poke, setPoke] = React.useState('')

  React.useEffect(() => {
    const fetchPoke = async () => {
      try {
        const response = await axios.get(props.url)
        setPoke(response.data)
      } catch (error) {
        console.log("Error fetchPoke", error);
      }
    };
    fetchPoke();
  },[])

  return (
    <Card sx={{ maxWidth: 245 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={poke?.sprites?.other?.home?.front_default}
          alt={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {poke.height} ft.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {poke.weight} Kg.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardItem;
