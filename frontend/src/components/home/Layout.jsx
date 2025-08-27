
import { Outlet } from 'react-router-dom';
import SideBar from '../Dashboard/SideBar';
import { useState } from 'react';

function Layout() {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-base">
            {/* Sidebar */}
            <SideBar open={open} setOpen={setOpen} />

            {/* Contenedor*/}
            <main className={`flex-1 p-6 transition-all duration-300 ${open ? 'ml-64' : 'ml-16'} overflow-hidden`}>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
