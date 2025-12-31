import { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  Wrench,
  FileCheck,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';

export function Layout() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Package size={18} />, label: 'Assets', path: '/assets' },
    { icon: <TrendingUp size={18} />, label: 'Production', path: '/production' },
    { icon: <Wrench size={18} />, label: 'Maintenance', path: '/maintenance' },
    { icon: <FileCheck size={18} />, label: 'Compliance', path: '/compliance' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB] overflow-x-hidden font-sans">
      {/* Header - White with Clean Border */}
      <header className="bg-white border-b border-gray-200 w-full relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link to="/" className="shrink-0 block hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-sm">
                <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
              </div>
              <div>
                <h1 className="text-xl font-black text-black leading-none uppercase tracking-tight">
                  Petro<span className="text-orange-500">Manage</span>
                </h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                  Operations
                </p>
              </div>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-1 py-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-bold text-sm whitespace-nowrap
                    ${isActive
                      ? 'bg-black text-white shadow-lg shadow-black/10'
                      : 'text-gray-500 hover:text-black hover:bg-gray-100'}
                  `}
                >
                  {/* Icon gets orange when active if you want more color, or stays white */}
                  <span className="transition-colors">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* User Section */}
            <div className="relative flex items-center shrink-0 border-l pl-4 border-gray-200 ml-2">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black shrink-0 shadow-[0_4px_12px_rgba(249,115,22,0.3)] group-hover:bg-orange-600 transition-all">
                  OM
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                  <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-gray-50 mb-1">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-wider">User Account</p>
                      <p className="text-sm font-bold text-black truncate">Operations Manager</p>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User size={18} />
                      Profile Settings
                    </Link>
                    
                    <button
                      onClick={() => {
                        console.log("Logging out...");
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}