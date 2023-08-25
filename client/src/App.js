import './App.css';
import SplashPage from './components/splashPage';
import { AuthProvider } from './AuthContext';

function App() {

  return (
    <AuthProvider>
      <div className="App">
        <SplashPage />
      </div>
    </AuthProvider>
  );
}

export default App;
