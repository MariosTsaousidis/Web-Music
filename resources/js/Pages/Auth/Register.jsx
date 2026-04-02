import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('auth.register'));
    };

    return (
        <AuthLayout>
            <Head title="Εγγραφή" />

            <div className="text-center mb-10">
                <h1 className="text-4xl font-black text-white aura-text tracking-tighter mb-2">
                    Γίνε Μέρος.
                </h1>
                <p className="text-white/40 font-medium tracking-tight">Δημιούργησε τη δική σου μουσική αύρα.</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-white/50 ml-1" htmlFor="name">
                        Full Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="w-full bg-white/5 text-white border border-white/10 rounded-2xl px-6 py-4 hover:border-white/30 focus:border-[#1db954] focus:ring-4 focus:ring-[#1db954]/10 focus:outline-none transition-all placeholder-white/20 font-medium"
                        placeholder="John Doe"
                        autoComplete="name"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    {errors.name && <p className="text-[#f15e6c] text-xs font-bold mt-2 ml-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-white/50 ml-1" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full bg-white/5 text-white border border-white/10 rounded-2xl px-6 py-4 hover:border-white/30 focus:border-[#1db954] focus:ring-4 focus:ring-[#1db954]/10 focus:outline-none transition-all placeholder-white/20 font-medium"
                        placeholder="john@example.com"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    {errors.email && <p className="text-[#f15e6c] text-xs font-bold mt-2 ml-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-white/50 ml-1" htmlFor="password">
                        Create Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full bg-white/5 text-white border border-white/10 rounded-2xl px-6 py-4 hover:border-white/30 focus:border-[#1db954] focus:ring-4 focus:ring-[#1db954]/10 focus:outline-none transition-all placeholder-white/20 font-medium"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    {errors.password && <p className="text-[#f15e6c] text-xs font-bold mt-2 ml-1">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-white/50 ml-1" htmlFor="password_confirmation">
                        Confirm Password
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="w-full bg-white/5 text-white border border-white/10 rounded-2xl px-6 py-4 hover:border-white/30 focus:border-[#1db954] focus:ring-4 focus:ring-[#1db954]/10 focus:outline-none transition-all placeholder-white/20 font-medium"
                        placeholder="••••••••"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    {errors.password_confirmation && <p className="text-[#f15e6c] text-xs font-bold mt-2 ml-1">{errors.password_confirmation}</p>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-white text-black font-black text-sm uppercase tracking-[0.2em] rounded-full px-8 py-5 hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-[0_20px_40px_rgba(255,255,255,0.1)] mt-8"
                >
                    Εγγραφή
                </button>
            </form>

            <div className="mt-12 text-center">
                <p className="text-white/30 text-sm font-medium mb-4">Έχεις ήδη λογαριασμό;</p>
                <Link href={route('login')} className="inline-block border border-white/10 glass-panel rounded-full px-8 py-3 text-sm font-black uppercase tracking-widest hover:bg-white/5 transition">
                    Είσοδος
                </Link>
            </div>
        </AuthLayout>
    );
}
