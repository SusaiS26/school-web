// import {configureStore} from 'reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import reduxmasterredux from '../appreduxvalues/reduxmaster'


export const store = configureStore({
    reducer: { namevalue: reduxmasterredux }
});