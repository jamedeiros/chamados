import { useContext } from 'react';
import { AuthContext } from '../../context/auth';

function Dashboard() {
  const { signOut } = useContext(AuthContext);

  return (
    <div>
      <h1>DASHBOARD</h1>
      <button onClick={ () => signOut() }>Fazer logout</button>
    </div>
  );
}

export default Dashboard;
