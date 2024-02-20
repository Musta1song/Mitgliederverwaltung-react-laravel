import React from 'react'
import "./StartPage.css";
import { Button } from '@mui/material';
import { CgLayoutList } from "react-icons/cg";
import { BiListPlus } from "react-icons/bi";





const StartPage = () => {
    return (
        <div>
            <div className='Body'><div className='div'>
                <Button className='Button' sx={{ mx: 1 }} variant="outlined" href="/list"> <CgLayoutList size={70} />
                    Mitgliederliste</Button>
                <Button className='Button' sx={{ mx: 1 }} variant="outlined" href="/add"><BiListPlus size={70} />
                    Mitglieder hinzufügen</Button>
            </div> </div>
        </div>




    )
};
export default StartPage