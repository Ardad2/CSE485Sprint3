import { configureStore } from '@reduxjs/toolkit';

import behaviorsReducer from './behaviors';
import usersReducer from './users';
import authTokensReducer from './authTokens';

export const store = configureStore({
    reducer: {
        behaviors: behaviorsReducer,
        users: usersReducer,
        authTokens: authTokensReducer
    }
});
