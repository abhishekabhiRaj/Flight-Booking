import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Button } from '@mui/material';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full">
      <div className="text-center">
        <Button 
          variant="contained"
          onClick={() => navigate('/admin/blogs')}
          className="px-8 py-6 text-lg flex items-center gap-2 admin-button"
        >
          <FileText className="w-6 h-6" />
          Manage Blogs
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard; 