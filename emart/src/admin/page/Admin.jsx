import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import {Users} from 'lucide-react'
import AdminCard from '../components/Admincard';
import Adminhero from '../components/Adminhero';

const Admin = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const chekcAuthToken = async () => {
      if (pathname === '/admin') {
        const authToken = localStorage.getItem('adminToken');
        if (!authToken) {
          navigate('/admin/login');
        } else {
          navigate('/admin');
        }
      }
    }

    chekcAuthToken();
  }, [pathname, navigate]);

  return (
    <>
    <AdminNavbar/>
    <Adminhero pageName={'Dashboard'}/>
      <div className='admin-item container mb-5'>
        <div className="row">
          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <AdminCard count={1} widgetname={'Total Registration'} icon={<Users size={45}/>}/>
          </div>
          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <AdminCard count={2} widgetname={'Total Product'} icon={<Users size={45}/>}/>
          </div>
          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <AdminCard count={3} widgetname={'Total Ordered'} icon={<Users size={45}/>}/>
          </div>
          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <AdminCard count={4} widgetname={'Total Earning'} icon={<Users size={45}/>}/>
          </div>
        </div>
      </div>
      {/* <div className="course-items container">
        <h5 className='my-3'>Recenty Added Courses</h5>
        <div className="row">
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div> */}
    </>
  );
};

export default Admin;