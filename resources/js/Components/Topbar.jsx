import { ChevronLeft, ChevronRight, User, LogOut } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Topbar() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <header className="h-16 bg-[#121212]/90 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
            <div className="flex items-center space-x-4">
                <button onClick={() => window.history.back()} className="bg-black/40 rounded-full p-1 hover:bg-black/60 transition">
                    <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button onClick={() => window.history.forward()} className="bg-black/40 rounded-full p-1 hover:bg-black/60 transition">
                    <ChevronRight className="w-6 h-6 text-white" />
                </button>
            </div>
            
            <div className="flex items-center space-x-4 relative">
                {user ? (
                    <>
                        <Link href="/songs/create" className="bg-white text-black text-sm font-bold px-4 py-2 rounded-full hover:scale-105 transition">
                            Upload Song
                        </Link>
                        <button 
                            onClick={() => setDropdownOpen(!dropdownOpen)} 
                            className="bg-black/40 p-1 rounded-full flex items-center space-x-2 text-white hover:bg-[#282828] cursor-pointer transition select-none"
                        >
                            <div className="bg-[#535353] rounded-full p-1 border-2 border-transparent hover:border-white">
                                <User className="w-5 h-5" />
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute top-12 right-0 w-48 bg-[#282828] rounded-md shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2">
                                <div className="px-4 py-2 text-sm font-bold border-b border-[#3e3e3e]">
                                    {user.name}
                                </div>
                                <Link 
                                    href="/profile" 
                                    className="block px-4 py-2 text-sm text-[#eaebed] hover:bg-[#3e3e3e] transition"
                                >
                                    Προφίλ
                                </Link>
                                <Link 
                                    href={route('logout')} 
                                    method="post" 
                                    as="button" 
                                    className="w-full text-left px-4 py-2 text-sm text-[#eaebed] hover:bg-[#3e3e3e] transition flex items-center space-x-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Αποσύνδεση</span>
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <Link href={route('register')} className="text-[#a7a7a7] font-bold hover:text-white hover:scale-105 transition">
                            Εγγραφή
                        </Link>
                        <Link href={route('login')} className="bg-white text-black text-base font-bold px-8 py-3 rounded-full hover:scale-105 transition">
                            Είσοδος
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}
