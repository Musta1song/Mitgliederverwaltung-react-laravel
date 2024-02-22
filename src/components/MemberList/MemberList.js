import React, { useState, useEffect } from 'react';
import MemberService from '../../DataService';
import './MemberList.css'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/de';
import moment from 'moment';

const MemberList = () => {
    const [data, setMemberlist] = useState([]);

    useEffect(() => {
        getMemberList();
    }, []);

    const getMemberList = () => {
        MemberService.getAll()
            .then(response => {
                setMemberlist(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const initialState = {
        exit: null,

    }; const [exit, setExit] = useState(initialState);
    const exitDate = moment(exit).format('YYYY-MM-DD');

    const remove = () => {
        MemberService.remove(toChange[0].id)
            .then(response => {
                console.log("Member with deleted successfully")
                window.location.reload()
            })
            .catch(e => {
                console.log(e);
            });
    };
    const openUpdateForm = () => {
        let FormStyle = document.getElementById("exit")
        FormStyle.style.visibility = "visible"
    }
    let toChange

    const setIsActiveToFalse = () => {
        let UpdateData = {
            isActive: toChange[0].isActive = false,
            ExitDate: exitDate
        }
        console.log(UpdateData)
        MemberService.update(toChange[0].id, UpdateData)
            .then(response => {
                alert("Mitglied erfolgreich aktualisiert!")
            })
            .catch(e => {
                console.log(e);
            });
    };

    const columns = [
        { field: 'MemberId', headerName: 'Mitgliedsnummer', width: 130 },
        { field: 'FirstName', headerName: 'Vorname', width: 130 },
        { field: 'SecondName', headerName: 'Nachname', width: 130 },
        { field: 'BirthDate', headerName: 'Geburtsdatum', width: 130 },
        { field: 'EntryDate', headerName: 'Vereinseintritt', width: 130 },
        { field: 'ExitDate', headerName: 'Vereinsaustritt', width: 130 },
        {
            field: 'fullName',
            headerName: 'Vor- und Nachname',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.FirstName || ''} ${params.row.SecondName || ''}`,
        },
    ];

    return (
        <div>
            <div className='flex'>
                <div id='form'><Button id='RemoveBt' onClick={remove}>Mitglied löschen</Button><br></br>
                    <Button id='FormBt' onClick={openUpdateForm}>Austritt angeben</Button>
                    <div id='exit'>
                        <LocalizationProvider dateAdapter={AdapterMoment} dateLibInstance={moment}>
                            <DatePicker
                                label="Vereinsaustritt" className='Date'
                                onChange={(date) => setExit(date)}
                                id="ExitDate"
                            />
                        </LocalizationProvider>

                        <br></br>
                        <Button onClick={setIsActiveToFalse}>Aktualisieren</Button>

                    </div>
                </div>
                <div className='ddiv'>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        hideFooterPagination
                        onRowSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRowData = data.filter((row) =>
                                selectedIDs.has(row.id)
                            );
                            toChange = selectedRowData
                            console.log(toChange);
                            const FormBt = document.getElementById('FormBt')
                            const RemoveBt = document.getElementById('RemoveBt')
                            RemoveBt.style.visibility = "visible"
                            FormBt.style.visibility = "visible"

                        }}

                    />

                </div>
            </div>
        </div>
    );

};
export default MemberList

