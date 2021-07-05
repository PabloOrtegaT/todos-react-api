import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleteAsync, deleteTodoAsync } from '../redux/todoSlice';
import { useAuth0 } from '@auth0/auth0-react';

const TodoItem = ({ id, title, completed, completionDate }) => {
	const dispatch = useDispatch();
	const { user, getAccessTokenSilently } = useAuth0();

	const handleCheckboxClick = () => {
		dispatch(toggleCompleteAsync({ id, completed: !completed, user, getAccessTokenSilently }));
	};

	const handleDeleteClick = () => {
		dispatch(deleteTodoAsync({ id, user, getAccessTokenSilently }));
	};

	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center ml-5 '>
					<input
						type='checkbox'
						className='mr-3'
						readOnly
						checked={completed}
						onClick={handleCheckboxClick}
					></input>
					{title}
				</span>
				<span className='d-flex align-items-center'>
				{`Due date: ${completionDate}`}
				</span>
				<button onClick={handleDeleteClick} className='btn btn-danger'>
					Delete
				</button>
			</div>
		</li>
	);
};

export default TodoItem;