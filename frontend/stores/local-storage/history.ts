import { writable } from 'svelte/store'


export class HistoryState {
    public chartType = 'stacked-area'
    public scale = 'hour'
}

const key = 'state-history'
const initialState = new HistoryState()
Object.assign(initialState, JSON.parse(localStorage.getItem(key) ?? '{}'))

export const historyState = writable<HistoryState>(initialState)

historyState.subscribe(state => {
    localStorage.setItem(key, JSON.stringify(state))
})
