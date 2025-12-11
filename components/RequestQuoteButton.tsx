"use client";

import React, { useState } from 'react';
import Modal from './Modal';
import MultiStepForm from './MultiStepForm';

type Mode = 'modal' | 'link' | 'callback';

type Props = {
  /**
   * Käyttötila:
   * - 'modal': avaa oletuksena modaalin, jonka sisältönä on MultiStepForm
   * - 'link': renderöi ankkurin (href = linkHref)
   * - 'callback': kutsuu onRequestQuote-handleria
   */
  mode?: Mode;
  onRequestQuote?: () => void;
  className?: string;
  children?: React.ReactNode;
  /** Teksti painikkeeseen/linkkiin. Yliajaa childrenin. */
  label?: string;
  /** Href linkkitilassa (oletus: #contact) */
  linkHref?: string;
  /** Yliajaa modaalin sisällön (oletus: <MultiStepForm inModal />) */
  modalContent?: React.ReactNode;
};

/**
 * Yleis-käyttöinen CTA "Pyydä tarjous".
 * Oletus: avaa modaalin, jossa monivaihelomake.
 */
export default function RequestQuoteButton({
  mode,
  onRequestQuote,
  className = "",
  children,
  label,
  linkHref = '#contact',
  modalContent,
}: Props) {
  // Oletustila: jos onRequestQuote annettu ja mode ei ole asetettu, käytä 'callback',
  // muuten käytä 'modal' oletuksena helppoon pudotus-käyttöön.
  const resolvedMode: Mode = mode ?? (onRequestQuote ? 'callback' : 'modal');

  const [open, setOpen] = useState(false);

  const baseClasses =
    "inline-block rounded-full bg-[#ccff00] px-6 py-3 font-semibold text-slate-900 shadow-lg transition hover:scale-105 hover:bg-[#dfff33]";

  const content = label ?? children ?? "Pyydä tarjous";

  if (resolvedMode === 'link') {
    return (
      <a href={linkHref} className={`${baseClasses} ${className}`.trim()}>
        {content}
      </a>
    );
  }

  if (resolvedMode === 'callback') {
    return (
      <button type="button" onClick={onRequestQuote} className={`${baseClasses} ${className}`.trim()}>
        {content}
      </button>
    );
  }

  // modal
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`${baseClasses} ${className}`.trim()}>
        {content}
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {modalContent ?? <MultiStepForm inModal />}
      </Modal>
    </>
  );
}
