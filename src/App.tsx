import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from './components/Login'
import Signup from './components/Signup'
import MainPage from './components/MainPage';
import ErrPage from './ErrPage';
import AddItem from './components/AddItem';

function App() {

  const routes = [
    {
      path: "/login",
      element: <Login/>,
    },{
      path: "/signup",
      element: <Signup/>,
    },{
      path: "/main",
      element: <MainPage/>
    },{
      path:"/addItem",
      element: <AddItem/>
    }
  ];

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<Layout />}>
            {routes.map((r, index) => {
              return <Route key={index} path={r.path} element={r.element} />;
            })}
          </Route>
          <Route path="*" element={<ErrPage />} />
        </Routes>
      </Router>
    </>
  )
}


function Layout() {
  return (
    <>
      <div className='h-dvh w-dvw bg-black m-0 p-0'>
        <Outlet />
      </div>
    </>
  );
}


export default App
