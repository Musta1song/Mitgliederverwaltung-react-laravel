import React, { useState, useEffect } from 'react';
import MemberService from '../../DataService';
import './MemberList.css'
import { DataGrid } from '@mui/x-data-grid';


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
                />

            </div>
        </div>
    );

};
export default MemberList

