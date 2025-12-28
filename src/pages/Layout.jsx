import { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  Wrench,
  FileCheck,
  User,
  LogOut
} from 'lucide-react';

export function Layout() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Package size={18} />, label: 'Assets', path: '/assets' },
    { icon: <TrendingUp size={18} />, label: 'Production', path: '/production' },
    { icon: <Wrench size={18} />, label: 'Maintenance', path: '/maintenance' }, // Fixed spelling
    { icon: <FileCheck size={18} />, label: 'Compliance', path: '/compliance' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-x-hidden">

      <header className="bg-white border-b border-gray-200 shadow-sm w-full relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

          <Link to="/" className="shrink-0 cursor-pointer block hover:opacity-80 transition-opacity">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
              PetroManage
            </h1>
            <p className="text-[10px] md:text-xs text-gray-500">
              Operations Management
            </p>
          </Link>

          <div className="flex items-center gap-6 ">
            <nav className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium text-sm whitespace-nowrap
                    ${isActive
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-slate-800'}
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* --- DROPDOWN SECTION START --- */}
            <div className="relative flex items-center shrink-0 border-l pl-6 border-gray-100">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium shrink-0 shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
              >
                OM
              </button>

              {isDropdownOpen && (
                <>
                  {/* Backdrop to close dropdown on outside click */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />

                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User size={16} className="text-gray-900" />
                      Profile
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={() => {
                        console.log("Logging out...");
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
            {/* --- DROPDOWN SECTION END --- */}
          </div>

        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}