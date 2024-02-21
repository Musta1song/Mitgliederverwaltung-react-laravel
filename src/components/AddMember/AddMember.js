import MemberService from '../../DataService';
import { React, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import './AddMember.css'
import DateFnsUtils from '@date-io/date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
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
        role: "",
    };
    const [member, setMember] = useState(initialState);

    const [entry, setEntry] = useState(new Date());
    const EntryDate = moment(entry).format('YYYY-MM-DD');

    const [exit, setExit] = useState(new Date());
    const ExitDate = moment(exit).format('YYYY-MM-DD');

    const [birth, setBirthdate] = useState(new Date());
    const BirthDate = moment(birth).format('YYYY-MM-DD');

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
            ExitDate: member.ExitDate = ExitDate,
            EntryDate: member.EntryDate = EntryDate,
            BirthDate: member.BirthDate = BirthDate,
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
                    <InputLabel htmlFor="outlined-adornment-amount">Mitgliedsbeitrag</InputLabel >
                    <OutlinedInput label="Mitgliedsbeitrag" value={member.MembershipFee} onChange={handleInputChange} name='MembershipFee'
                        id="outlined-adornment-amount"
                        endAdornment={<InputAdornment position="end">€</InputAdornment>}
                    />


                    <TextField className='TextField' sx={{ mt: 1 }} id="outlined-basic" label="Rolle" variant="outlined"
                        value={member.role} onChange={handleInputChange}
                        name='role'
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                            <DatePicker format="dd.MM.YYY"
                                label="Geburtsdatum" className='Date' selected={exit}
                                onChange={(date) => setBirthdate(date)}
                                id="ExitDate" />
                            <DatePicker format="dd.MM.YYY" label="Vereinseintritt *" className='Date' selected={entry}
                                onChange={(date) => setEntry(date)}
                                id="EntryDate" />

                            <DatePicker format="dd.MM.YYY" label="Vereinsaustritt" className='Date' selected={exit}
                                onChange={(date) => setExit(date)} 
                                id="ExitDate" />
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