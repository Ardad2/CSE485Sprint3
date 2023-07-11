import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [ {
            id: 0,
            username: "John",
            behaviors: [

            ]
        }
        ], 
    },

    reducers: {
        addUser: (state, action) => {

            var exists = false;

            for (var i = 0; i < state.users.length; i++)
            {
                if (state.users[i].username == (action.payload.username))
                {
                    exists = true;
                }
            }

            if (exists == false)
            {


                var newId = 0;

                if (state.users.length > 0)
                {

                for (var i = 0; i < state.users.length; i++)
                {
                    newId = state.users[i].id;
                }

                newId = newId + 1;
            }



            state.users.push({
                id: newId,
                username: action.payload.username,
                behaviors: [
                ]
            });
        


            }


        },
        removeUser: (state, action) => {
            state.users.splice(state.users.indexOf(action.payload.id), 1);

        },

        addBehavior: (state, action) => {

            var index = 0;

            for (var i = 0; i < state.users.length ; i++)
            {                
                if (state.users[i].username == (action.payload.username)) {
                    index = i;
                }
            }


            state.users[index].behaviors.push({
                id: action.payload.id,
                name: action.payload.name,
                icon: action.payload.icon,
                count: action.payload.count,
                goalCount: action.payload.goalCount,
                memo: action.payload.memo,
                date: action.payload.date,
                type: action.payload.type,
            });
        },
        
        incrementBehavior: (state, action) => {
            

            var index = 0;
            var behaviorIndex = 0;

            for (var i = 0; i < state.users.length ; i++)
            {                
                if (state.users[i].username == (action.payload.username)) {
                    index = i;
                }
            }

            for (var i = 0; i < state.users[index].behaviors.length ; i++)
            {                
                if (state.users[index].behaviors.name == (action.payload.behaviorName)) {
                    behaviorIndex = i;
                }
            }



            state.users[index].behaviors[behaviorIndex].count++;


        },

        decrementBehavior: (state, action) => {
            

            var index = 0;
            var behaviorIndex = 0;

            for (var i = 0; i < state.users.length ; i++)
            {                
                if (state.users[i].username == (action.payload.username)) {
                    index = i;
                }
            }

            for (var i = 0; i < state.users[index].behaviors.length ; i++)
            {                
                if (state.users[index].behaviors.name == (action.payload.behaviorName)) {
                    behaviorIndex = i;
                }
            }


            if (state.users[index].behaviors[behaviorIndex].count > 0)
            {
            state.users[index].behaviors[behaviorIndex].count--;
            }


        },
    }
});

export const addUser = usersSlice.actions.addUser;
export const removeUser = usersSlice.actions.removeUser;
export const addUserBehavior = usersSlice.actions.addBehavior;
export const incrementBehavior = usersSlice.actions.incrementBehavior;
export const decrementBehavior = usersSlice.actions.decrementBehavior;


export default usersSlice.reducer;

