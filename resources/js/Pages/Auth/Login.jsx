import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('auth.create'));
    };

    return (
        <AuthLayout>
            <Head title="Είσοδος" />

            <div className="text-center mb-10">
                <h1 className="text-4xl font-black text-white aura-text tracking-tighter mb-2">
                    Καλώς Ήρθες.
                </h1>
                <p className="text-white/40 font-medium tracking-tight">Συνδέσου για να ακούσεις την αύρα σου.</p>
            </div>

            <form onSubmit={submit} className="space-y-6">
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
                    />
                    {errors.email && <p className="text-[#f15e6c] text-xs font-bold mt-2 ml-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-white/50 ml-1" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full bg-white/5 text-white border border-white/10 rounded-2xl px-6 py-4 hover:border-white/30 focus:border-[#1db954] focus:ring-4 focus:ring-[#1db954]/10 focus:outline-none transition-all placeholder-white/20 font-medium"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && <p className="text-[#f15e6c] text-xs font-bold mt-2 ml-1">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between px-1">
                    <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-5 h-5 rounded-lg bg-white/5 border-white/10 text-[#1db954] focus:ring-[#1db954] focus:ring-offset-0 transition cursor-pointer"
                            />
                        </div>
                        <span className="ml-3 text-sm font-bold text-white/40 group-hover:text-white/60 transition">Remember me</span>
                    </label>

                    <Link
                        href={route('password.request')}
                        className="text-xs font-black text-white/30 uppercase tracking-widest hover:text-[#1db954] transition"
                    >
                        Forgot?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-white text-black font-black text-sm uppercase tracking-[0.2em] rounded-full px-8 py-5 hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-[0_20px_40px_rgba(255,255,255,0.1)] mt-4"
                >
                    Είσοδος
                </button>
            </form>

            <div className="mt-12 text-center">
                <p className="text-white/30 text-sm font-medium mb-4">Δεν έχεις λογαριασμό;</p>
                <Link href={route('register')} className="inline-block border border-white/10 glass-panel rounded-full px-8 py-3 text-sm font-black uppercase tracking-widest hover:bg-white/5 transition">
                    Δημιουργία Αύρας
                </Link>
            </div>
        </AuthLayout>
    );
}
