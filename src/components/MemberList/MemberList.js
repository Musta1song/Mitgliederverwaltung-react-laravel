import React, { useState, useEffect } from 'react';
import MemberService from '../../DataService';
import './MemberList.css'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import DateFnsUtils from '@date-io/date-fns';

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

    let toChange
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
    const setIsActiveToFalse = () => {
        let UpdateData = [{ isActive: toChange[0].isActive = false },
        { ExitDate: exitDate }]
        MemberService.update(toChange[0].id, UpdateData)
            .then(response => {
                console.log("Member with updated successfully")
                window.location.reload()
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
                <div id='form'><Button onClick={remove}>delete</Button><br></br>
                    <Button onClick={openUpdateForm}>update</Button>
                    <div id='exit'>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <LocalizationProvider adapterLocale="de">
                                <DatePicker
                                    format="dd.MM.YYY"
                                    label="Vereinsaustritt" className='Date'
                                    onChange={(date) => setExit(date)}
                                    id="ExitDate" value={dayjs(exit)}
                                />
                            </LocalizationProvider>

                        </MuiPickersUtilsProvider><br></br>
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
                        checkboxSelection
                        hideFooterPagination
                        onRowSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRowData = data.filter((row) =>
                                selectedIDs.has(row.id)
                            );
                            toChange = selectedRowData
                            console.log(toChange);

                        }}

                    />

                </div>
            </div>
        </div>
    );

};
export default MemberList

