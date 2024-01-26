import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ProfileCard = ({backgroundImage}) => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 500, width: 600}}
        image={backgroundImage}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            Tony Stark
        </Typography>

        <Typography variant="body2" color="text.secondary">
            Playboy, Billinaire, Philanthropist
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small">Yes</Button>
        <Button size="small">Maybe</Button>
        <Button size="small">No</Button>
      </CardActions>
    </Card>
  );
}

export default ProfileCard;