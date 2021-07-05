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
				<span className='d-flex align-items-center'>
					<input
						type='checkbox'
						readOnly
						checked={completed}
						onClick={handleCheckboxClick}
					></input>
				</span>
				<span className='d-flex align-items-center w-50 p-3 text-break'>
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