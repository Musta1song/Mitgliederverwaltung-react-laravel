import MemberService from '../../DataService';
import { React, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import './AddMember.css'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/de';



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
        if (data.FirstName === "" || data.SecondName === "" ||
            data.MemberId == null | data.MembershipFee == null ||
            data.EntryDate == null || data.BirthDate == null) {
            alert("Bitte füllen Sie alle markierten Felder aus!")
            console.log(data)
            return
        }


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
                alert("Mitglied wurde hinzugefügt!")
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>

            <div className='FormGroup'>

                <FormControl className='FormControl' id='FormControl'>
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
                    <InputLabel sx={[{ position: "sticky" }]} htmlFor="outlined-adornment-amount">Mitgliedsbeitrag *</InputLabel >
                    <OutlinedInput value={member.MembershipFee} onChange={handleInputChange} name='MembershipFee'
                        id="outlined-adornment-amount"
                        endAdornment={<InputAdornment position="end">€</InputAdornment>}
                    />


                    <TextField className='TextField' sx={{ mt: 1 }} id="outlined-basic" label="Rolle" variant="outlined"
                        value={member.role} onChange={handleInputChange}
                        name='role'
                    />
                    <LocalizationProvider dateAdapter={AdapterMoment} dateLibInstance={moment}>
                        <DatePicker  sx={{ mt: 1 }}
                            label="Geburtsdatum *" className='Date'
                            onChange={(date) => setBirthdate(date)}
                            id="BirthDate" />
                        <DatePicker sx={{ mt: 1 }}
                            label="Vereinseintritt *" className='Date'
                            onChange={(date) => setEntry(date)}
                            id="EntryDate" />
                    </LocalizationProvider>

                    <Button sx={{ mt: 2 }} onClick={saveMember} className='Button' variant="outlined" size="large">
                        Weiter
                    </Button>  </FormControl>

            </div>





        </div>
    )
};
export default AddMember