import React,{useState} from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Day } from '../types';
import { Pagination } from './Pagination';

export interface WeatherRow {
    key:string;
    icon: IconDefinition;
    date: Day;
    low: string;
    high: string;
    wind: string;
}
export interface WeatherTableProps {
    data: WeatherRow[];
};

const weatherHeaders = {
    icon: "",
    date: "Date",
    low: "Low",
    high: "High",
    wind: "Wind"
};

export const WeatherTable: React.FC<WeatherTableProps> = ({ data }) => {
    const [pageNumber,setPageNumber] = useState(1);
    const handlePageChange = (index:number)=>{
        setPageNumber(index);
    }

    const getRowData = (row: WeatherRow): JSX.Element[] => {
        return Object.keys(weatherHeaders).map(key => {
            const value = row[key as keyof WeatherRow];
            let display;
            if (key === 'icon') {
                display = <FontAwesomeIcon icon={value as IconDefinition} size='4x'/>
            } else {
                display = value as String;
            }
            return (
                <td key={key}>
                    {
                        display
                    }
                </td>
            )
        })
    };
    return (
        <div>
        <table className='weather-table'>
            <thead>
                <tr>
                    {Object.entries(weatherHeaders).map(([key, value]) => (
                        <th key={key}>{value}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.slice(((pageNumber-1)*4),((pageNumber)*4)).map((row) => (
                    <tr key={row.key}>
                        {getRowData(row)}
                    </tr>
                ))}
            </tbody>
        </table>
        <Pagination count={4} handleChange={(pageNumber)=>handlePageChange(pageNumber)}/>
        </div>
    );
};