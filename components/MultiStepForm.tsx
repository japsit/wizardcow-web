"use client";
import { useState } from "react";

// ----------------------------------------------------------
// Palvelukategoriat (Step 1)
// ----------------------------------------------------------
const SERVICE_GROUPS = [
    { id: "website", label: "Verkkosivusto tai -kauppa" },
    { id: "software", label: "Ohjelmistokehitys ja integraatiot" },
    { id: "mobile", label: "Mobiiliapplikaatio" },
    { id: "server", label: "Palvelinylläpito" },
    { id: "security", label: "Tietoturva" },
    { id: "unknown", label: "En ole varma – auttakaa valitsemaan" },
];

// ----------------------------------------------------------
// Lisäkysymykset kategorioille
// ----------------------------------------------------------
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
    "Järjestelmän tai sivuston auditointi",
    "Haavoittuvuuksien kartoitus",
    "Muu tietoturvatarve",
];

const SERVER_OPTIONS = [
    "Palvelimen ylläpito (Linux)",
    "Palvelimen koventaminen / security hardening",
    "Pilvipalvelun ylläpito (AWS / Hetzner / Contabo)",
    "Valvonta ja monitorointi",
    "Muu ylläpitotarve",
];

// ----------------------------------------------------------
// Budjetti & aikataulu
// ----------------------------------------------------------
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
    "Ei kiirettä / suunnitteluasteella",
];

export default function MultiStepForm() {
    const [step, setStep] = useState(1);
    const [service, setService] = useState("");

    // Step 2 – tarkennukset
    const [websiteFeatures, setWebsiteFeatures] = useState<string[]>([]);
    const [projectDescription, setProjectDescription] = useState("");

    const [securityNeeds, setSecurityNeeds] = useState<string[]>([]);
    const [serverNeeds, setServerNeeds] = useState<string[]>([]);

    // Step 3 – budjetti ja aikataulu
    const [budget, setBudget] = useState("");
    const [timeline, setTimeline] = useState("");

    // Step 4 – yhteystiedot
    const [contact, setContact] = useState({ name: "", email: "" });

    // Toggle functions
    function toggleWebsiteFeature(f: string) {
        setWebsiteFeatures((prev) =>
            prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
        );
    }

    function toggleSecurity(f: string) {
        setSecurityNeeds((prev) =>
            prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
        );
    }

    function toggleServer(f: string) {
        setServerNeeds((prev) =>
            prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
        );
    }

    // Send form
    async function handleSubmit() {
        await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify({
                service,
                websiteFeatures,
                securityNeeds,
                serverNeeds,
                projectDescription,
                budget,
                timeline,
                contact,
            }),
            headers: { "Content-Type": "application/json" },
        });

        setStep(6);
    }

    return (
        <section className="py-20 bg-white border-t border-slate-200">
            <div className="max-w-2xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-10">
                    Pyydä maksuton arvio projektillesi
                </h2>

                {/* ----------------------------------------------------------
            STEP 1 – palvelukategoria
        ---------------------------------------------------------- */}
                {step === 1 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Mitä haluaisit meidän toteuttavan?</h3>

                        <div className="grid gap-3">
                            {SERVICE_GROUPS.map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => {
                                        setService(id);
                                        setStep(2);
                                    }}
                                    className="w-full text-left p-4 border rounded-lg hover:bg-slate-50"
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ----------------------------------------------------------
            STEP 2 – palvelukohtaiset tarkennukset
        ---------------------------------------------------------- */}
                {step === 2 && (
                    <div className="space-y-8">
                        {/* Verkkosivun lisäominaisuudet */}
                        {service === "website" && (
                            <div>
                                <h3 className="text-xl font-semibold mb-3">
                                    Mitä ominaisuuksia haluat sivustolle?
                                </h3>
                                <div className="grid gap-2">
                                    {WEBSITE_FEATURES.map((f) => (
                                        <label key={f} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={websiteFeatures.includes(f)}
                                                onChange={() => toggleWebsiteFeature(f)}
                                            />
                                            {f}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Software development → vapaa kuvaus */}
                        {service === "software" && (
                            <div>
                                <label className="font-medium">Kerro lyhyt kuvaus projektista</label>
                                <textarea
                                    rows={5}
                                    className="w-full mt-2 border p-3 rounded-lg"
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                    placeholder="Mitä haluat toteuttaa? Mitä ongelmaa ratkaisemme?"
                                />
                            </div>
                        )}

                        {/* Odoo → vapaa kuvaus */}
                        {service === "odoo" && (
                            <div>
                                <label className="font-medium">Kuvaus Odoo-tarpeesta</label>
                                <textarea
                                    rows={5}
                                    className="w-full mt-2 border p-3 rounded-lg"
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                    placeholder="Esimerkiksi: moduulit, automaatiot, integraatiot…"
                                />
                            </div>
                        )}

                        {/* Odoo → vapaa kuvaus */}
                        {service === "mobile" && (
                            <div>
                                <label className="font-medium">Kuvaus tarpeesta</label>
                                <textarea
                                    rows={5}
                                    className="w-full mt-2 border p-3 rounded-lg"
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                    placeholder="Esimerkiksi: peli, hyötyohjelma, laajuus…"
                                />
                            </div>
                        )}

                        {/* Tietoturva */}
                        {service === "security" && (
                            <div>
                                <h3 className="text-xl font-semibold mb-3">
                                    Mitä tarvitsette tietoturvan osalta?
                                </h3>
                                <div className="grid gap-2">
                                    {SECURITY_OPTIONS.map((opt) => (
                                        <label key={opt} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={securityNeeds.includes(opt)}
                                                onChange={() => toggleSecurity(opt)}
                                            />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Palvelinylläpito */}
                        {service === "server" && (
                            <div>
                                <h3 className="text-xl font-semibold mb-3">
                                    Minkälaista palvelinylläpitoa tarvitsette?
                                </h3>
                                <div className="grid gap-2">
                                    {SERVER_OPTIONS.map((opt) => (
                                        <label key={opt} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={serverNeeds.includes(opt)}
                                                onChange={() => toggleServer(opt)}
                                            />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* En ole varma → vapaa kuvaus */}
                        {service === "unknown" && (
                            <div>
                                <label className="font-medium">
                                    Kerro lyhyesti tilanteestasi – autamme oikean ratkaisun valinnassa
                                </label>
                                <textarea
                                    rows={5}
                                    className="w-full mt-2 border p-3 rounded-lg"
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                    placeholder="Mitä haluat saavuttaa? Mikä mietityttää?"
                                />
                            </div>
                        )}

                        <div className="flex justify-between mt-4">
                            <button onClick={() => setStep(1)} className="text-slate-500">
                                ← Takaisin
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
                            >
                                Jatka →
                            </button>
                        </div>
                    </div>
                )}

                {/* ----------------------------------------------------------
            STEP 3 – budjetti & aikataulu
        ---------------------------------------------------------- */}
                {step === 3 && (
                    <div className="space-y-10">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">Arvioitu budjetti</h3>
                            <div className="grid gap-2">
                                {BUDGET_OPTIONS.map((b) => (
                                    <button
                                        key={b}
                                        onClick={() => setBudget(b)}
                                        className={`p-3 border rounded-lg text-left ${
                                            budget === b ? "border-indigo-600 bg-indigo-50" : ""
                                        }`}
                                    >
                                        {b}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">Aikataulu</h3>
                            <div className="grid gap-2">
                                {TIMELINE_OPTIONS.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTimeline(t)}
                                        className={`p-3 border rounded-lg text-left ${
                                            timeline === t ? "border-indigo-600 bg-indigo-50" : ""
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between mt-4">
                            <button onClick={() => setStep(2)} className="text-slate-500">
                                ← Takaisin
                            </button>
                            <button
                                onClick={() => setStep(4)}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
                            >
                                Jatka →
                            </button>
                        </div>
                    </div>
                )}

                {/* ----------------------------------------------------------
            STEP 4 – yhteystiedot
        ---------------------------------------------------------- */}
                {step === 4 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Yhteystiedot</h3>

                        <input
                            className="w-full border p-3 rounded-lg"
                            placeholder="Nimi"
                            value={contact.name}
                            onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        />

                        <input
                            type="email"
                            className="w-full border p-3 rounded-lg"
                            placeholder="Sähköposti"
                            value={contact.email}
                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        />

                        <div className="flex justify-between">
                            <button onClick={() => setStep(3)} className="text-slate-500">
                                ← Takaisin
                            </button>
                            <button
                                onClick={() => setStep(5)}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
                            >
                                Jatka →
                            </button>
                        </div>
                    </div>
                )}

                {/* ----------------------------------------------------------
            STEP 5 – yhteenveto
        ---------------------------------------------------------- */}
                {step === 5 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Tarkista tiedot</h3>

                        <div className="border p-4 rounded-lg space-y-2 text-sm">
                            <p><strong>Palvelu:</strong> {service}</p>

                            {service === "website" && (
                                <p>
                                    <strong>Ominaisuudet:</strong>{" "}
                                    {websiteFeatures.join(", ") || "Ei valintoja"}
                                </p>
                            )}

                            {service === "security" && (
                                <p>
                                    <strong>Tietoturva:</strong>{" "}
                                    {securityNeeds.join(", ") || "Ei valintoja"}
                                </p>
                            )}

                            {service === "server" && (
                                <p>
                                    <strong>Palvelinylläpito:</strong>{" "}
                                    {serverNeeds.join(", ") || "Ei valintoja"}
                                </p>
                            )}

                            {/* Software, Odoo, Unknown → tekstikuvaus */}
                            {["software", "odoo", "unknown"].includes(service) && (
                                <p>
                                    <strong>Kuvaus:</strong>{" "}
                                    {projectDescription || "Ei kuvausta"}
                                </p>
                            )}

                            <p><strong>Budjetti:</strong> {budget}</p>
                            <p><strong>Aikataulu:</strong> {timeline}</p>

                            <p><strong>Nimi:</strong> {contact.name}</p>
                            <p><strong>Email:</strong> {contact.email}</p>
                        </div>

                        <div className="flex justify-between">
                            <button onClick={() => setStep(4)} className="text-slate-500">
                                ← Takaisin
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg"
                            >
                                Lähetä →
                            </button>
                        </div>
                    </div>
                )}

                {/* ----------------------------------------------------------
            STEP 6 – valmis!
        ---------------------------------------------------------- */}
                {step === 6 && (
                    <div className="text-center space-y-4">
                        <h3 className="text-2xl font-bold text-green-600">Kiitos!</h3>
                        <p>Olemme vastaanottaneet viestin ja palaamme sinulle pian.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
