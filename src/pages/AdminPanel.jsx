import React, { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { Navigate } from 'react-router-dom';
import ElectionForm from '../components/Election/ElectionForm';
// import ElectionList from '../components/Election/ElectionList';

const AdminPanel = () => {
//   const { user, isAdmin } = useContext(AuthContext);

//   if (!user || !isAdmin()) {
//     return <Navigate to="/login" replace />;
//   }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ElectionForm />
        {/* <ElectionList /> */}
      </div>
    </div>
  );
};

export default AdminPanel;