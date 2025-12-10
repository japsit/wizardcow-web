"use client";
import { motion } from "framer-motion";
import { CurrencyEuroIcon, GlobeAltIcon, BoltIcon } from "@heroicons/react/24/solid";

const items = [
    {
        title: "Tuntihinta 85 € / h",
        desc: "Selkeä ja läpinäkyvä hinnoittelu — maksat vain tehdystä työstä.",
        icon: <CurrencyEuroIcon className="h-8 w-8 text-[#6e0081]" />,
    },
    {
        title: "Palvelemme etänä",
        desc: "Sujuvat etätapaamiset ja sähköiset allekirjoitukset ilman turhaa säätöä.",
        icon: <GlobeAltIcon className="h-8 w-8 text-[#6e0081]" />,
    },
    {
        title: "Aloitamme jopa 24–48 tunnissa",
        desc: "Ketterät aloitukset — projektit voivat alkaa käytännössä heti.",
        icon: <BoltIcon className="h-8 w-8 text-[#6e0081]" />,
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Miksi valita meidät?</h2>
                <p className="mt-2 text-slate-600">Hyödyt, jotka saat heti käyttöösi</p>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
                {items.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="
              relative rounded-2xl p-8 bg-white
              border-2 border-[#6e0081]
              shadow-[0_8px_24px_rgba(0,0,0,0.12)]
            "
                    >
                        <div className="flex items-center gap-6">

                            {/* ICON – 1/5 of card width, square, perfectly centered */}
                            <motion.div
                                whileHover={{ scale: 1.12 }}
                                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                                className="
                  flex items-center justify-center
                  bg-[#6e0081]/10 border border-[#6e0081]/30
                  shadow-[0_0_14px_rgba(110,0,129,0.25)]
                  rounded-xl
                  aspect-square
                  shrink-0
                "
                                style={{
                                    width: "20%",       // ⭐ exactly 1/5 of card width
                                    minWidth: "60px",   // prevents tiny icons on mobile
                                    maxWidth: "90px"    // prevents overly large icons on desktop
                                }}
                            >
                                {item.icon}
                            </motion.div>

                            {/* TEXT */}
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-[#6e0081]">{item.title}</h3>
                                <p className="mt-2 text-slate-700 leading-relaxed">{item.desc}</p>
                            </div>

                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
