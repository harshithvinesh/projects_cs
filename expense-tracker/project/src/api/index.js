import * as realAuth from './auth.js'
import * as realTransactions from './transactions.js'
import * as realAnalytics from './analytics.js'
import * as mock from './mock/index.js'

const useMock = import.meta.env.VITE_USE_MOCK !== 'false'
const source = useMock ? mock : { ...realAuth, ...realTransactions, ...realAnalytics }

export const login = source.login
export const register = source.register
export const getTransactions = source.getTransactions
export const createTransaction = source.createTransaction
export const updateTransaction = source.updateTransaction
export const deleteTransaction = source.deleteTransaction
export const getSummary = source.getSummary
