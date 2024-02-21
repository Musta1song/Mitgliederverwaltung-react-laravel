import MemberService from '../../DataService';
import { React, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import './AddMember.css'
import DateFnsUtils from '@date-io/date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import 'dayjs/locale/de';
import dayjs from 'dayjs';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

const AddMember = () => {
    const initialState = {
        id: null,
        FirstName: "",
        SecondName: "",
        MemberId: null,
        MembershipFee: null,
        entry: null,
        birth: null,
        role: "",
    };
    const [member, setMember] = useState(initialState);

    const [entry, setEntry] = useState(initialState);
    const entryDate = moment(entry).format('YYYY-MM-DD');

    const [birth, setBirthdate] = useState(initialState);
    const birthDate = moment(birth).format('YYYY-MM-DD');


    const handleInputChange = event => {
        const { name, value } = event.target;
        setMember({ ...member, [name]: value });
    };

    const saveMember = () => {
        var data = {
            FirstName: member.FirstName,
            SecondName: member.SecondName,
            MemberId: member.MemberId,
            MembershipFee: member.MembershipFee,
            ExitDate: member.ExitDate = null,
            EntryDate: member.EntryDate = entryDate,
            BirthDate: member.BirthDate = birthDate,
            role: member.role,
        };

        MemberService.create(data)
            .then(response => {
                setMember({
                    id: response.data.id,
                    MemberId: response.data.MemberId,
                    name: response.data.name,
                    MembershipFee: response.data.MembershipFee,
                    ExitDate: response.data.ExitDate,
                    EntryDate: response.data.EntryDate,
                    role: response.data.role,

                });
                console.log(response.data);
                alert("Mitglied hinzugefügt")
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>

            <div className='FormGroup'>

                <FormControl className='FormControl'>
                <h1> Mitglied eintragen:</h1>

                    <TextField className='TextField' sx={{ mt: 1 }} id="outlined-basic" label="Vorname *" variant="outlined"
                        value={member.FirstName} onChange={handleInputChange}
                        name='FirstName'
                    />
                    <TextField className='TextField' sx={{ mt: 1 }} id="outlined-basic" label="Nachname *" variant="outlined"
                        value={member.SecondName} onChange={handleInputChange}
                        name='SecondName'
                    />
                    <TextField className='TextField' sx={{ mt: 1 }} id="outlined-basic" label="Mitgliedsnummber *" variant="outlined"
                        value={member.MemberId} onChange={handleInputChange}
                        name='MemberId'
                    />
                    <InputLabel sx={[{position: "relative"}]} htmlFor="outlined-adornment-amount">Mitgliedsbeitrag</InputLabel >
                    <OutlinedInput value={member.MembershipFee} onChange={handleInputChange} name='MembershipFee'
                        id="outlined-adornment-amount"
                        endAdornment={<InputAdornment position="end">€</InputAdornment>}
                    />


                    <TextField className='TextField' sx={{ mt: 1 }} id="outlined-basic" label="Rolle" variant="outlined"
                        value={member.role} onChange={handleInputChange}
                        name='role'
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <LocalizationProvider adapterLocale="de">
                            <DatePicker format="dd.MM.YYY"
                                label="Geburtsdatum" className='Date'
                                onChange={(date) => setBirthdate(date)}
                                id="BirthDate" value={dayjs(birth)}/>
                            <DatePicker format="dd.MM.YYY" label="Vereinseintritt *" className='Date' 
                                onChange={(date) => setEntry(date)}
                                id="EntryDate" value={dayjs(entry)} />
                        </LocalizationProvider>
                        

                    </MuiPickersUtilsProvider>




                    <Button sx={{ mt: 2 }} onClick={saveMember} className='Button' variant="outlined" size="large">
                        Weiter
                    </Button>  </FormControl>

            </div>





        </div>
    )
};
export default AddMember