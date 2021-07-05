import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getTodosAsync = createAsyncThunk(
	'todos/getTodosAsync',
	async (payload) => {
		const token = await payload.getAccessTokenSilently();
		
		const resp = await fetch(`http://localhost:5000/users/${encodeURI(`${payload.user.email}`)}/todos`, {
			headers: {
				Authorization: `Bearer ${token}`
			},
		});
		if (resp.ok) {
			const todos = await resp.json();
			return { todos };
		}
	}
);

export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async (payload) => {
		const token = await payload.getAccessTokenSilently();

		const resp = await fetch(`http://localhost:5000/users/${encodeURI(`${payload.name}`)}/todos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ 
				title: payload.title,
				completionDate: payload.completionDate, 
				completed: false }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

export const toggleCompleteAsync = createAsyncThunk(
	'todos/completeTodoAsync',
	async (payload) => {
		const token = await payload.getAccessTokenSilently();
		const resp = await fetch(`http://localhost:5000/users/${encodeURI(`${payload.user.email}`)}/todos/${payload.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',	
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ completed: payload.completed }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async (payload) => {
		const token = await payload.getAccessTokenSilently();
		const resp = await fetch(`http://localhost:5000/users/${encodeURI(`${payload.user.email}`)}/todos/${payload.id}`, {
			method: 'DELETE',
			headers:{
				Authorization: `Bearer ${token}`
			}
		});

		if (resp.ok) {
			return { id: payload.id };
		}
	}
);

export const todoSlice = createSlice({
	name: 'todos',
	initialState: [],
	reducers: {
		addTodo: (state, action) => {
			const todo = {
				title: action.payload.title,
				completionDate: action.payload.completionDate,
				completed: false,
			};
			state.push(todo);
		},
		toggleComplete: (state, action) => {
			const index = state.findIndex((todo) => todo._id === action.payload.id);
			state[index].completed = action.payload.completed;
		},
		deleteTodo: (state, action) => {
			return state.filter((todo) => todo._id !== action.payload.id);
		},
	},
	extraReducers: {
		[getTodosAsync.fulfilled]: (state, action) => {
			return action.payload.todos;
		},
		[addTodoAsync.fulfilled]: (state, action) => {
			state.push(action.payload.todo);
		},
		[toggleCompleteAsync.fulfilled]: (state, action) => {
			const index = state.findIndex(
				(todo) => todo._id === action.payload.todo.id
			);
			state[index].completed = action.payload.todo.completed;
			//return action.payload.todos;
		},
		[deleteTodoAsync.fulfilled]: (state, action) => {
			return state.filter((todo) => todo._id !== action.payload.id);
		},
	},
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;