import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import { useAuth0 } from '@auth0/auth0-react'
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading resources...</div>

  return (

    <div className='container bg-light p-4 mt-3'>
      <div className='d-flex justify-content-between align-items-center'>
        <Profile />
        <LoginButton />
        <LogoutButton />
      </div>

			<AddTodoForm />
			<TodoList />

		</div>
      

  );
}

export default App;
