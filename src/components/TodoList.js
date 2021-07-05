import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';
import moment from 'moment-timezone';
import { useAuth0 } from '@auth0/auth0-react';

const TodoList = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos);
	const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

	useEffect(() => {
		dispatch(getTodosAsync({ user, getAccessTokenSilently }));
	}, [dispatch, user, getAccessTokenSilently]);

	return (
		isAuthenticated && (<div>
			<h3>Your todos</h3>
			{todos.map((todo) => (
				<ul className='list-group' key={todo._id}>
					<TodoItem 
						id={todo._id} 
						title={todo.title} 
						completionDate={ moment(todo.completionDate).tz('America/Mexico_city').format('YYYY-MM-DD HH:mm') } 
						completed={todo.completed} 
					/>
				</ul>
			))}
		</div>)
		
	);
};

export default TodoList;