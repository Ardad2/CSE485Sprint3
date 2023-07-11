import { createSlice } from '@reduxjs/toolkit';

const behaviorsSlice = createSlice({
    name: 'behaviors',
    initialState: {
        behaviors: [],   
    },

    reducers: {
        addBehavior: (state, action) => {
            state.behaviors.push(action.payload);
        },
        removeBehavior: (state, action) => {
            state.behaviors.splice(state.behaviors.indexOf(action.payload.id), 1);

        }
    }
});

export const addBehavior = behaviorsSlice.actions.addBehavior;
export const removeBehavior = behaviorsSlice.actions.removeBehavior;
export default behaviorsSlice.reducer;

