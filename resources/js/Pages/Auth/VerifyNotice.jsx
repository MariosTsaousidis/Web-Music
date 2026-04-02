import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';

export default function VerifyNotice({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <AuthLayout>
            <Head title="Email Verification" />

            <h1 className="text-[2rem] font-bold text-center mb-6 tracking-tighter">
                Επαλήθευση Email
            </h1>

            <div className="mb-6 text-sm text-[#b3b3b3]">
                Ευχαριστούμε για την εγγραφή! Πριν ξεκινήσεις, μπορείς να επαληθεύσεις το email σου κάνοντας κλικ στον σύνδεσμο που μόλις σου στείλαμε; Αν δεν έλαβες το email, θα χαρούμε να σου στείλουμε ένα άλλο.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-base text-[#1db954] p-4 bg-[#1db954]/10 rounded border border-[#1db954]/20">
                    Ένας νέος σύνδεσμος επαλήθευσης έχει σταλεί στη διεύθυνση email που έδωσες.
                </div>
            )}

            <form onSubmit={submit} className="mt-8 flex flex-col items-center justify-between space-y-4">
                <button
                    disabled={processing}
                    className="w-full bg-[#1db954] text-black font-bold rounded-full px-6 py-3.5 hover:bg-[#3be072] hover:scale-[1.02] active:scale-100 transition-all duration-200"
                >
                    Αποστολή νέου συνδέσμου
                </button>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="text-sm font-bold text-[#b3b3b3] hover:text-white uppercase tracking-widest mt-4 transition"
                >
                    Αποσύνδεση
                </Link>
            </form>
        </AuthLayout>
    );
}
