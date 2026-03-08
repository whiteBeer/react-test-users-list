import { lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Loader from './components/Loader';
import './App.css';

const UsersPage = lazy(() => import('./pages/UsersPage'));

function App() {

    return (
        <>
            <div>
                <Link to={'/'}>Users List</Link>
                <hr/>
            </div>
            <Suspense fallback={<Loader/>}>
                <Routes>
                    <Route
                        path="/"
                        element={<UsersPage />}
                    />
                </Routes> 
            </Suspense>
        </>
    );
}

export default App;
