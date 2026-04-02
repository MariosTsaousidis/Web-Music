import { Head, useForm, Link } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <AuthLayout>
            <Head title="Επαναφορά Κωδικού" />

            <div className="text-center mb-8">
                <h1 className="text-4xl font-black text-white aura-text tracking-tighter mb-4">
                    Reset.
                </h1>
                <p className="text-white/40 text-sm font-medium leading-relaxed px-4">
                    Ξέχασες τον κωδικό σου; Κανένα πρόβλημα. Πληκτρολόγησε το email σου και θα σου στείλουμε έναν σύνδεσμο επαναφοράς.
                </p>
            </div>

            {status && <div className="mb-6 font-bold text-sm text-emerald-400 bg-emerald-400/10 p-4 rounded-2xl text-center border border-emerald-400/20 shadow-lg animate-in fade-in slide-in-from-top-4 duration-500">{status}</div>}

            <form onSubmit={submit} className="space-y-8">
                <div className="space-y-3">
                    <label className="block text-xs font-black uppercase tracking-widest text-white/50 ml-1" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full bg-white/5 text-white border border-white/10 rounded-2xl px-6 py-4 hover:border-white/30 focus:border-[#1db954] focus:ring-4 focus:ring-[#1db954]/10 focus:outline-none transition-all placeholder-white/20 font-medium"
                        placeholder="your@email.com"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-[#f15e6c] text-xs font-bold mt-2 ml-1">{errors.email}</p>}
                </div>

                <div className="flex flex-col space-y-4 items-center">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-white text-black font-black text-sm uppercase tracking-[0.2em] rounded-full px-8 py-5 hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                    >
                        {processing ? 'Αποστολη...' : 'Αποστολή Email'}
                    </button>

                    <Link href={route('login')} className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-white transition">
                        Επιστροφή στην Είσοδο
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
