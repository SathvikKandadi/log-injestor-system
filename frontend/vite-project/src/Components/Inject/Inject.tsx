import './Inject.css'
import { Button, Card, TextField, Typography } from '@mui/material';

function Inject()
{

    const cardStyle = {
        width:"50%",
        margin:"5%",
        padding:"1%",
    }

    const title = {
        margin:"2%",
    }

    const inputStyle = {
        width:"100%",
        margin:"1%",
    }

    return(
        <div className='injectMain'>
            <Typography variant='h4' style={title}>Inject Log Data Below</Typography>
            <div className='injectBody'>
                <Card style={cardStyle}>
                    <TextField style={inputStyle} id="outlined-basic" variant="outlined"></TextField>
                    <TextField style={inputStyle} id="outlined-basic" variant="outlined"></TextField>
                    <TextField style={inputStyle} id="outlined-basic" variant="outlined"></TextField>
                    <TextField style={inputStyle} id="outlined-basic" variant="outlined"></TextField>
                    <TextField style={inputStyle} id="outlined-basic" variant="outlined"></TextField>
                    <TextField style={inputStyle} id="outlined-basic" variant="outlined"></TextField>
                    <TextField style={inputStyle} id="outlined-basic" variant="outlined"></TextField>
                    <TextField style={inputStyle} id="outlined-basic" variant="outlined"></TextField>
                    <Button variant='contained' >Submit</Button>
                </Card>
            </div>
            
        </div>
    )
}

export default Inject;