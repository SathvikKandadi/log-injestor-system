import { Button, Card, Typography } from '@mui/material';
import './Homepage.css'
import { useNavigate } from 'react-router-dom';

function Homepage()
{
    const navigate = useNavigate();
    const buttonStyle = {
        width:"12%",
        height:"7%",
        margin:"4%",
    };

    const cardStyle = {
        margin:"2%",
       
        
    };


    return (
        <div className='homepageMain'>
            <Card style={cardStyle}>
            <div className='header'>
                <Typography variant='h4'>Welcome To Log Injestor System </Typography>
            </div>
            <div className='footer'>
                <Button  style={buttonStyle} variant='contained' onClick={() => navigate('/inject')}>Inject</Button>
                <Button style={buttonStyle} variant='contained' onClick={() => navigate('/search')}>Search</Button>
            </div>
            </Card>
            
            
        </div>
    )
}

export default Homepage;