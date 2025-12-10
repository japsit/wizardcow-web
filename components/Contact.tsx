"use client";
import { useState } from "react";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("sending");

        const formData = new FormData(e.currentTarget);

        const res = await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify({
                name: formData.get("name"),
                email: formData.get("email"),
                message: formData.get("message"),
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            setStatus("sent");
            e.currentTarget.reset();
        } else {
            setStatus("error");
        }
    }

    return (
        <section className="py-20 bg-white border-t border-slate-200">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4">Pyydä maksuton arvio</h2>
                <p className="text-lg text-slate-600 mb-10">
                    Kerro lyhyesti projektistasi — palaamme sinulle nopeasti arviolla
                    hinnasta ja aikataulusta.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div>
                        <label className="block font-medium mb-1">Nimi</label>
                        <input
                            name="name"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                            placeholder="Etunimi Sukunimi"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Sähköposti</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                            placeholder="nimi@yritys.fi"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Kuvaus projektista</label>
                        <textarea
                            name="message"
                            required
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                            placeholder="Keräämme sivut WordPressillä… haluamme integraation… budjetti-arvio?"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                        {status === "sending" ? "Lähetetään…" : "Lähetä viesti"}
                    </button>

                    {status === "sent" && (
                        <p className="text-green-600 text-center font-medium">
                            Kiitos! Palaamme sinulle pian.
                        </p>
                    )}

                    {status === "error" && (
                        <p className="text-red-600 text-center font-medium">
                            Viestin lähetys epäonnistui. Yritä uudelleen.
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}
