import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { search, standard, imperial, metric, metrics } from '../../types';

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();

const date = yyyy + '-' + mm + '-' + dd;

const initialState: search = {
    date: date,
    city: 'Ireland',
    selectedMetric: standard,
    metrics: [standard, metric, imperial]
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateDate(state, action: PayloadAction<string>) {
            state.date = action.payload;
        },
        updateCity(state, action: PayloadAction<string>) {
            state.city = action.payload;
        },
        updateSelectedMetric(state, action: PayloadAction<metrics>) {
            state.selectedMetric = action.payload;
        },
    },
});

export const { updateDate, updateCity, updateSelectedMetric } = searchSlice.actions;
export default searchSlice.reducer;