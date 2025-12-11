"use client";
declare const grecaptcha: any;

import { useState, useEffect } from "react";
import {
    GlobeAltIcon,
    CodeBracketIcon,
    DevicePhoneMobileIcon,
    ServerStackIcon,
    ShieldCheckIcon,
    QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

// ----------------------------------------------------------
// Palvelukategoriat
// ----------------------------------------------------------
const SERVICE_GROUPS = [
    { id: "website", label: "Verkkosivusto tai -kauppa", icon: GlobeAltIcon },
    { id: "software", label: "Ohjelmistokehitys ja integraatiot", icon: CodeBracketIcon },
    { id: "mobile", label: "Mobiiliapplikaatio", icon: DevicePhoneMobileIcon },
    { id: "server", label: "Palvelinylläpito", icon: ServerStackIcon },
    { id: "security", label: "Tietoturva", icon: ShieldCheckIcon },
    { id: "unknown", label: "Muuta", icon: QuestionMarkCircleIcon },
];

const WEBSITE_FEATURES = [
    "Kuvagalleria",
    "Yhteydenottolomake",
    "WordPress",
    "WooCommerce",
    "Monikielisyys",
    "Responsiivinen design",
    "SEO-perusoptimointi",
    "Blogi",
];

const SECURITY_OPTIONS = [
    "Tietoturvakonsultointi",
    "Auditointi",
    "Haavoittuvuuskartoitus",
    "Muu tietoturvatarve",
];

const SERVER_OPTIONS = [
    "Linux-ylläpito",
    "Security hardening",
    "Pilvipalvelun ylläpito",
    "Monitorointi",
    "Muu ylläpitotarve",
];

const BUDGET_OPTIONS = [
    "Alle 1 000 €",
    "1 000 – 3 000 €",
    "3 000 – 6 000 €",
    "Yli 6 000 €",
    "En tiedä vielä",
];

const TIMELINE_OPTIONS = [
    "Heti kun mahdollista",
    "1–4 viikon sisällä",
    "1–3 kuukauden sisällä",
    "Ei kiirettä",
];

export default function MultiStepForm({ inModal = false }) {
    const [step, setStep] = useState(1);

    const [service, setService] = useState("");
    const [websiteFeatures, setWebsiteFeatures] = useState<string[]>([]);
    const [securityNeeds, setSecurityNeeds] = useState<string[]>([]);
    const [serverNeeds, setServerNeeds] = useState<string[]>([]);
    const [projectDescription, setProjectDescription] = useState("");

    const [budget, setBudget] = useState("");
    const [timeline, setTimeline] = useState("");

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [error, setError] = useState("");

    // Load reCAPTCHA script
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        document.body.appendChild(script);
    }, []);

    // Scroll top when step changes in modal
    useEffect(() => {
        if (inModal) {
            document.querySelector("#modal-scroll")?.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }, [step, inModal]);

    // Toggle helper
    function toggle(setter: any, current: string[], item: string) {
        setter(
            current.includes(item)
                ? current.filter((x) => x !== item)
                : [...current, item]
        );
    }

    // Validation
    function validateStep(currentStep: number): boolean {
        setError("");

        if (currentStep === 4) {
            if (!contact.email && !contact.phone) {
                setError("Anna vähintään sähköposti tai puhelinnumero.");
                return false;
            }
        }

        return true;
    }

    function goToStep(next: number) {
        if (!validateStep(step)) return;
        setStep(next);
    }

    // SUBMIT
    async function handleSubmit() {
        if (!validateStep(4)) return;

        setError("");

        try {
            // Ensure reCAPTCHA is loaded and ready before executing
            const getToken = async (): Promise<string> => {
                if (typeof grecaptcha === "undefined" || !grecaptcha.execute) {
                    // give the script a brief chance to load if user is very fast
                    await new Promise((r) => setTimeout(r, 300));
                }

                if (typeof grecaptcha === "undefined" || !grecaptcha.execute) {
                    throw new Error("reCAPTCHA ei latautunut (grecaptcha puuttuu).");
                }

                return await new Promise<string>((resolve, reject) => {
                    try {
                        grecaptcha.ready(async () => {
                            try {
                                const t = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "submit" });
                                resolve(t);
                            } catch (e) {
                                reject(e);
                            }
                        });
                    } catch (e) {
                        reject(e);
                    }
                });
            };

            const token = await getToken();

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    service,
                    websiteFeatures,
                    securityNeeds,
                    serverNeeds,
                    projectDescription,
                    budget,
                    timeline,
                    contact,
                    recaptchaToken: token,
                }),
            });

            if (!response.ok) {
                try {
                    const data = await response.json();
                    setError(data?.error || "Virhe viestin lähetyksessä. Yritä myöhemmin uudelleen.");
                } catch {
                    setError("Virhe viestin lähetyksessä. Yritä myöhemmin uudelleen.");
                }
                return;
            }

            setStep(6);
        } catch (e: any) {
            console.error("Form submit error:", e);
            setError(e?.message || "Odottamaton virhe lähetettäessä lomaketta.");
        }
    }

    return (
        <div className={inModal ? "" : "py-20"}>
            <div className={inModal ? "" : "max-w-2xl mx-auto px-4"}>

                {error && (
                    <p className="text-red-600 font-medium text-center mb-4">{error}</p>
                )}

                {/* ------------------------- STEP 1 ------------------------- */}
                {step === 1 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-center mb-6">
                            Mitä haluaisit meidän toteuttavan?
                        </h3>

                        <div className="
                            grid gap-4
                            grid-cols-1
                            sm:grid-cols-2
                            md:grid-cols-3
                        ">
                            {SERVICE_GROUPS.map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => {
                                        setService(id);
                                        goToStep(2);
                                    }}
                                    className="
                                        group p-6 rounded-2xl border bg-white
                                        transition-all duration-200 hover:border-[#6e0081]
                                        hover:scale-105 flex flex-col items-center justify-center
                                        text-center
                                    "
                                >
                                    <div className="
                                        w-16 h-16 flex items-center justify-center
                                        rounded-xl bg-[#6e0081] mb-3
                                    ">
                                        <Icon className="w-10 h-10 text-white" />
                                    </div>

                                    <span className="text-slate-900 font-medium text-lg">
                                        {label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ------------------------- STEP 2 ------------------------- */}
                {step === 2 && (
                    <div className="space-y-8">

                        {service === "website" && (
                            <>
                                <h3 className="text-xl font-semibold mb-3">Sivuston ominaisuudet</h3>
                                <div className="grid gap-3">
                                    {WEBSITE_FEATURES.map((f) => (
                                        <button
                                            key={f}
                                            onClick={() => toggle(setWebsiteFeatures, websiteFeatures, f)}
                                            className={`p-3 rounded-xl border text-left transition-all ${
                                                websiteFeatures.includes(f)
                                                    ? "bg-[#6e0081]/10 border-[#6e0081]"
                                                    : "bg-white hover:bg-slate-50"
                                            }`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        {["software", "mobile", "unknown"].includes(service) && (
                            <>
                                <label className="font-medium text-lg">Kerro projektista</label>
                                <textarea
                                    rows={5}
                                    className="w-full mt-2 border rounded-xl p-3"
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                />
                            </>
                        )}

                        {service === "security" && (
                            <>
                                <h3 className="text-xl font-semibold mb-3">
                                    Tietoturvan tarpeet
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {SECURITY_OPTIONS.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => toggle(setSecurityNeeds, securityNeeds, opt)}
                                            className={`px-4 py-2 rounded-xl border transition ${
                                                securityNeeds.includes(opt)
                                                    ? "bg-[#6e0081]/10 border-[#6e0081]"
                                                    : "hover:bg-slate-50"
                                            }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        {service === "server" && (
                            <>
                                <h3 className="text-xl font-semibold mb-3">
                                    Palvelinylläpidon tarve
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {SERVER_OPTIONS.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => toggle(setServerNeeds, serverNeeds, opt)}
                                            className={`px-4 py-2 rounded-xl border transition ${
                                                serverNeeds.includes(opt)
                                                    ? "bg-[#6e0081]/10 border-[#6e0081]"
                                                    : "hover:bg-slate-50"
                                            }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        <div className="flex justify-between mt-6">
                            <button className="text-slate-500" onClick={() => goToStep(1)}>
                                ← Takaisin
                            </button>
                            <button
                                onClick={() => goToStep(3)}
                                className="px-6 py-3 bg-[#6e0081] hover:bg-[#8b09a0] text-white rounded-xl"
                            >
                                Jatka →
                            </button>
                        </div>
                    </div>
                )}

                {/* ------------------------- STEP 3 ------------------------- */}
                {step === 3 && (
                    <div className="space-y-10">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">Arvioitu budjetti</h3>
                            <div className="grid gap-3">
                                {BUDGET_OPTIONS.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setBudget(opt)}
                                        className={`p-3 rounded-xl border text-left transition ${
                                            budget === opt
                                                ? "bg-[#6e0081]/10 border-[#6e0081]"
                                                : "hover:bg-slate-50"
                                        }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">Aikataulu</h3>
                            <div className="grid gap-3">
                                {TIMELINE_OPTIONS.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setTimeline(opt)}
                                        className={`p-3 rounded-xl border text-left transition ${
                                            timeline === opt
                                                ? "bg-[#6e0081]/10 border-[#6e0081]"
                                                : "hover:bg-slate-50"
                                        }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button className="text-slate-500" onClick={() => goToStep(2)}>
                                ← Takaisin
                            </button>
                            <button
                                onClick={() => goToStep(4)}
                                className="px-6 py-3 bg-[#6e0081] hover:bg-[#8b09a0] text-white rounded-xl"
                            >
                                Jatka →
                            </button>
                        </div>
                    </div>
                )}

                {/* ------------------------- STEP 4 ------------------------- */}
                {step === 4 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Yhteystiedot</h3>

                        <input
                            className="w-full border p-3 rounded-xl"
                            placeholder="Nimi"
                            value={contact.name}
                            onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        />

                        <input
                            type="email"
                            className="w-full border p-3 rounded-xl"
                            placeholder="Sähköposti"
                            value={contact.email}
                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        />

                        <input
                            className="w-full border p-3 rounded-xl"
                            placeholder="Puhelinnumero"
                            value={contact.phone}
                            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        />

                        <div className="flex justify-between">
                            <button className="text-slate-500" onClick={() => goToStep(3)}>
                                ← Takaisin
                            </button>
                            <button
                                onClick={() => goToStep(5)}
                                className="px-6 py-3 bg-[#6e0081] hover:bg-[#8b09a0] text-white rounded-xl"
                            >
                                Jatka →
                            </button>
                        </div>
                    </div>
                )}

                {/* ------------------------- STEP 5 ------------------------- */}
                {step === 5 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Tarkista tiedot</h3>

                        <div className="border p-4 rounded-xl bg-white/70 backdrop-blur text-sm space-y-2">
                            <p><strong>Palvelu:</strong> {service}</p>

                            {service === "website" && (
                                <p><strong>Ominaisuudet:</strong> {websiteFeatures.join(", ") || "Ei valintoja"}</p>
                            )}

                            {service === "security" && (
                                <p><strong>Tietoturva:</strong> {securityNeeds.join(", ") || "Ei valintoja"}</p>
                            )}

                            {service === "server" && (
                                <p><strong>Palvelinylläpito:</strong> {serverNeeds.join(", ") || "Ei valintoja"}</p>
                            )}

                            {["software", "mobile", "unknown"].includes(service) && (
                                <p><strong>Kuvaus:</strong> {projectDescription || "Ei kuvausta"}</p>
                            )}

                            <p><strong>Budjetti:</strong> {budget}</p>
                            <p><strong>Aikataulu:</strong> {timeline}</p>

                            <p><strong>Nimi:</strong> {contact.name}</p>
                            <p><strong>Email:</strong> {contact.email}</p>
                            <p><strong>Puhelin:</strong> {contact.phone}</p>
                        </div>

                        <div className="flex justify-between">
                            <button className="text-slate-500" onClick={() => goToStep(4)}>
                                ← Takaisin
                            </button>
                            <button
                                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl"
                                onClick={handleSubmit}
                            >
                                Lähetä →
                            </button>
                        </div>
                    </div>
                )}

                {/* ------------------------- STEP 6 ------------------------- */}
                {step === 6 && (
                    <div className="text-center py-10">
                        <h3 className="text-2xl font-bold text-green-600">Kiitos!</h3>
                        <p>Olemme vastaanottaneet pyyntösi ja palaamme pian.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
