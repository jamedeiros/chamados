import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import Header from '../../components/Header';

function Dashboard() {
  const { signOut } = useContext(AuthContext);

  return (
    <div>
      <Header />
      
      <h1>DASHBOARD</h1>
      <button onClick={ () => signOut() }>Fazer logout</button>
    </div>
  );
}

export default Dashboard;
