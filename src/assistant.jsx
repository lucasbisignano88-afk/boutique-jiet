import React, { useState, useEffect, useRef } from 'react'
import { JIE } from './data.js'
import { useStore, getUniverse } from './store.jsx'
import { Ic, ICON } from './components.jsx'
import { Mascot } from './mascot.jsx'

function buildCatalogContext() {
  const lines = JIE.products.map((p) => {
    const u = getUniverse(p.univers);
    let stock;
    if (p.stock === 0) stock = "ÉPUISÉ";
    else if (p.badges.includes("limite") || p.stock <= 5) stock = `stock limité (${p.stock} restants)`;
    else stock = `en stock (${p.stock})`;
    const tags = [];
    if (p.badges.includes("nouveau")) tags.push("nouveauté");
    if (p.oldPrice) tags.push(`promo (avant ${JIE.formatF(p.oldPrice)})`);
    return `- ${p.name} [${u.name}] — ${JIE.formatF(p.price)} — ${stock}${tags.length ? " — " + tags.join(", ") : ""}`;
  }).join("\n");
  return `Tu es l'assistant virtuel de « Jeux Import Export », la boutique de jeux, cartes à collectionner et manga à Papeete, Tahiti. Tu réponds en français, de façon chaleureuse, concise et utile (style tahitien sympathique, sans excès). Tu aides les clients à trouver des produits, connaître les prix (en francs CFP, format « 2 500 F ») et la disponibilité.

Règles :
- Base-toi UNIQUEMENT sur le catalogue ci-dessous. N'invente jamais de produit, de prix ni de stock.
- Si un produit est ÉPUISÉ, dis-le clairement et propose une alternative du catalogue.
- Si on te demande un produit absent du catalogue, dis-le honnêtement et suggère ce qui s'en rapproche.
- Réponses courtes (2-4 phrases max), tu peux lister quelques produits avec leur prix.
- Retrait gratuit en boutique en 1 h, ou livraison Tahiti & îles. Adresse : 89 Rue Dumont d'Urville, Papeete. Horaires : lun-ven 9h-11h / 11h30-16h30, samedi 8h-12h, fermé dimanche et jours fériés. Tél : 89 49 14 91.

CATALOGUE ACTUEL (${JIE.products.length} produits) :
${lines}`;
}

const SUGGESTIONS = [
  "Quelles nouveautés avez-vous ?",
  "Un cadeau pour un enfant de 8 ans ?",
  "Le display Pokémon est-il dispo ?",
  "Vos horaires d'ouverture ?",
];

export function Assistant() {
  const { navigate } = useStore();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: "assistant", content: "Ia ora na ! 👋 Je suis l'assistant de la boutique. Posez-moi vos questions sur nos jeux, cartes, mangas, les prix ou la disponibilité." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, loading, open]);

  const send = async (text) => {
    const q = (text != null ? text : input).trim();
    if (!q || loading) return;
    setInput("");
    const next = [...msgs, { role: "user", content: q }];
    setMsgs(next);
    setLoading(true);
    try {
      if (!ctxRef.current) ctxRef.current = buildCatalogContext();
      const apiMessages = [
        { role: "user", content: ctxRef.current },
        { role: "assistant", content: "Compris ! Je suis prêt à renseigner les clients sur le catalogue, les prix et la disponibilité." },
        ...next.filter((m) => m.role !== "system").map((m) => ({ role: m.role, content: m.content })),
      ];
      const reply = await window.claude.complete({ messages: apiMessages });
      setMsgs((m) => [...m, { role: "assistant", content: (reply || "").trim() || "Désolé, je n'ai pas de réponse pour le moment." }]);
    } catch (e) {
      setMsgs((m) => [...m, { role: "assistant", content: "Oups, je n'arrive pas à répondre à l'instant. Vous pouvez nous appeler au 89 49 14 91 ou passer en boutique 🙂" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className={`aibtn ${open ? "is-open" : ""}`} aria-label="Assistant IA de la boutique" onClick={() => setOpen((o) => !o)}>
        {open ? <Ic d={ICON.close} size={24} /> : <Mascot size={42} mood="happy" />}
        {!open && <span className="aibtn__pulse" />}
      </button>
      {!open && (
        <button className="aitip" onClick={() => setOpen(true)}>
          <span className="aitip__spark"><Ic d={ICON.spark} size={13} /></span>
          <span>Une question ? <strong>Assistant IA</strong></span>
        </button>
      )}

      <div className={`aipanel ${open ? "show" : ""}`} aria-hidden={!open}>
        <div className="aipanel__head">
          <div className="aipanel__id">
            <span className="aipanel__av"><Mascot size={34} mood="happy" /></span>
            <div>
              <strong>Assistant IA</strong>
              <span><span className="aipanel__dot" /> En ligne · répond en direct</span>
            </div>
          </div>
          <button className="hdr__icon" aria-label="Fermer" onClick={() => setOpen(false)}><Ic d={ICON.close} size={20} /></button>
        </div>

        <div className="aipanel__body" ref={bodyRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`aimsg aimsg--${m.role}`}>
              {m.role === "assistant" && <span className="aimsg__av"><Mascot size={26} mood="happy" /></span>}
              <div className="aimsg__bubble">{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="aimsg aimsg--assistant">
              <span className="aimsg__av"><Mascot size={26} mood="happy" /></span>
              <div className="aimsg__bubble aimsg__typing"><span /><span /><span /></div>
            </div>
          )}
          {msgs.length <= 1 && !loading && (
            <div className="aichips">
              {SUGGESTIONS.map((s, i) => <button key={i} className="aichip" onClick={() => send(s)}>{s}</button>)}
            </div>
          )}
        </div>

        <form className="aipanel__foot" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Votre question…" aria-label="Votre question" />
          <button type="submit" aria-label="Envoyer" disabled={loading || !input.trim()}><Ic d={ICON.send} size={20} /></button>
        </form>
        <p className="aipanel__legal">Assistant IA · démo — vérifiez la dispo en boutique</p>
      </div>
    </>
  );
}
