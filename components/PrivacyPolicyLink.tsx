"use client";

import React, { useState } from "react";
import Modal from "./Modal";

export default function PrivacyPolicyLink({
  className = "text-white/80 hover:text-white underline underline-offset-4",
  linkText = "Tietosuojaseloste",
}: {
  className?: string;
  linkText?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {linkText}
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold text-slate-900">Tietosuojaseloste</h2>
            <p className="mt-2 text-slate-700 text-sm">
                Tervetuloa Wizard Cow Oy:n tietosuojalaidunmaille! Tällä laitumella kerromme,
                miten käsittelemme henkilötietoja niin, etteivät tiedot päädy
                väärään navettaan.
            </p>

            <h3 className="mt-4 text-slate-900 font-semibold">Rekisterinpitäjä</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
                Wizard Cow Oy (3141537-2)<br />Helsinki, Suomi<br />
                Yhteydenotot voi osoittaa asiakaspalvelu[ät]wizardcow.fi
            </p>


            <h3 className="mt-4 text-slate-900 font-semibold">Verkkosivun sijainti ja tietojen siirrot</h3>
            <p className="text-slate-700 text-sm">
                Verkkosivut sijaitsevat Suomessa. Henkilötietoja ei siirretä EU:n ulkopuolelle.
                Sivusto ei käytä evästeitä.
            </p>

            <h3 className="mt-4 text-slate-900 font-semibold">Mitä tietoja keräämme</h3>
            <ul className="list-disc pl-6 text-slate-700 text-sm">
                <li>Nimi ja yhteystiedot (sähköposti, puhelinnumero)</li>
                <li>Viesti ja projektikuvaus lomakkeilta</li>
                <li>Tekniset tiedot (esim. IP-osoite) palvelun tietoturvan ja kehittämisen varmistamiseksi</li>
            </ul>

            <h3 className="mt-4 text-slate-900 font-semibold">Tietojen käyttötarkoitus</h3>
            <p className="text-slate-700 text-sm">
                Tietoja käytetään yhteydenottoihin vastaamiseen, palveluiden tuottamiseen, asiakassuhteen ylläpitoon
                sekä palvelun toimivuuden ja tietoturvan varmistamiseen. Emme käytä tietoja markkinointiin ilman erillistä suostumusta.
            </p>

            <h3 className="mt-4 text-slate-900 font-semibold">Tietojen säilytys</h3>
            <p className="text-slate-700 text-sm">
                Säilytämme asiakastietoja asiakassuhteen voimassaolon ajan sekä
                kohtuullisen ajan sen päättymisestä. Osaa tiedoista säilytetään pidempään lakisääteisten
                velvoitteiden, kuten kirjanpitolain, perusteella.
                Lomakeviestit säilyvät osana sähköpostijärjestelmää ja
                voivat poistua automaattisesti. Asiakastiedot säilyvät osana
                kirjanpitoa vähintään lain edellyttämän ajan.
            </p>

            <h3 className="mt-4 text-slate-900 font-semibold">Oikeutesi</h3>
            <p className="text-slate-700 text-sm">
                Voit pyytää pääsyä sinua koskeviin tietoihin sekä niiden oikaisua tai poistamista.
                Sinulla on myös oikeus rajoittaa käsittelyä, vastustaa käsittelyä oikeutetun edun perusteella
                ja tehdä valitus tietosuojavaltuutetulle.
            </p>


          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
            >
              Sulje
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
