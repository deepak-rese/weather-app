import React, { useState } from 'react';

interface PaginationProps {
    count: number;
    handleChange: (index: number) => void
};

export const Pagination: React.FC<PaginationProps> = ({ count, handleChange }) => {
    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleClick = (index: number | string) => {
        let nextIndex = -1;
        switch (typeof index) {
            case 'number':
                nextIndex = index;
                break;
            case 'string':
                nextIndex = index === 'next' && selectedIndex < count ? selectedIndex + 1 :
                    index === 'prev' && selectedIndex > 1 ? selectedIndex - 1 : -1;
                break;
        }

        if (nextIndex !== -1) {
            setSelectedIndex(nextIndex);
            handleChange(nextIndex);
        }
    }
    return (
        <div className='pagination'>
            <button onClick={() => handleClick('prev')}>{'<'}</button>
            {
                Array(count).fill(0).map((_, i) => (
                    <button key={i + 1} onClick={() => handleClick(i + 1)} className={selectedIndex===i+1 ? 'active':''}>{i + 1}</button>
                ))
            }
            <button onClick={() => handleClick('next')}>{'>'}</button>
        </div>
    );
};