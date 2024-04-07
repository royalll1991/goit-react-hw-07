import { createSelector, createSlice } from '@reduxjs/toolkit';
import { selectNameFilter } from './filtersSlice';
import { fetchContacts, deleteContact, addContact } from './contactsOps';


const slice = createSlice({
	name: 'contacts',

	initialState: {
		items: [],
    loading: false,
    error: null
	},
	
	
	extraReducers: builder => {
		builder
			.addCase(fetchContacts.pending, state => {
				state.error = false;
				state.isLoading = true;
			})
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.items = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchContacts.rejected, state => {
				state.error = true;
				state.isLoading = false;
			})
			.addCase(addContact.pending, state => {
				state.error = false;
				state.isLoading = true;
			})
			.addCase(addContact.fulfilled, (state, action) => {
				state.items.push(action.payload);
				state.isLoading = false;
			})
			.addCase(addContact.rejected, state => {
				state.error = true;
				state.isLoading = false;
			})
			.addCase(deleteContact.pending, state => {
				state.error = false;
				state.isLoading = true;
			})
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.items = state.items.filter(item => item.id !== action.payload.id);
				state.isLoading = false;
			})
			.addCase(deleteContact.rejected, state => {
				state.error = true;
				state.isLoading = false;
			});
	},
});
export const selectContacts = state => state.contacts.items;

export const selectError = state => state.contacts.error;

export const selectIsLoading = state => state.contacts.isLoading;

export const selectFilteredContacts = createSelector(
	[selectContacts, selectNameFilter],
	(contacts, nameFilter) => {
		return contacts.filter(contact =>
			contact.name.toLowerCase().includes(nameFilter.toLowerCase())
		);
	}
);




export default slice.reducer;