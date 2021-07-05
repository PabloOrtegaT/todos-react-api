import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../redux/todoSlice';
import DatePicker from "react-datepicker";
import { useAuth0 } from '@auth0/auth0-react';
import "react-datepicker/dist/react-datepicker.css";
  
const AddTodoForm = () => {
	const [value, setValue] = useState('');
	const dispatch = useDispatch();
	const [startDate, setStartDate] = useState(new Date());
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

	const onSubmit = (event) => {
		event.preventDefault();
		if (value) {
			dispatch(
				addTodoAsync({
					title: value,
					completionDate: startDate,
					name: user.email,
					getAccessTokenSilently: getAccessTokenSilently
				})
			);
		}
		setValue("");
		setStartDate(new Date());
	};
	

	return (
		isAuthenticated && (
			<form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
			<label>Todo title</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add todo...'
				value={value}
				onChange={(event) => setValue(event.target.value)}
			></input>
			<label>Completion before</label>
			<div className='datePicker'>
				<DatePicker 
					selected={startDate} 
					onChange={(date) => setStartDate(date)} 
					dateFormat="Pp"
					showTimeSelect
					minDate={new Date()}
				/>
			</div>
			
			<button type='submit' className='btn btn-primary mt-3 mb-2'>
				Submit
			</button>
			
		</form>
		)	
	);
};

export default AddTodoForm;