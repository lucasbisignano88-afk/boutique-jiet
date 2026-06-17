import React, { useState, useEffect } from 'react'
import { useStore } from './store.jsx'
import { Btn, Ic, ICON, F, Price, Loader } from './components.jsx'
import { Mascot } from './mascot.jsx'

function Field({ label, ...rest }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...rest} />
    </label>
  );
}

export function CheckoutPage() {
  const { cartLines, cartSubtotal, navigate, clearCart } = useStore();
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState("retrait");
  const livraison = mode === "livraison" ? 990 : 0;
  const total = cartSubtotal + livraison;

  useEffect(() => { if (cartLines.length === 0) navigate({ name: "catalogue" }); }, []);
  if (cartLines.length === 0) return <div className="page wrap section"><Loader label="Redirection…" /></div>;

  const placeOrder = () => {
    const num = "JIE-" + Math.floor(100000 + Math.random() * 900000);
    clearCart();
    navigate({ name: "confirmation", order: num, mode, total });
  };

  const steps = ["Livraison", "Paiement", "Récap"];

  return (
    <div className="page checkout">
      <div className="wrap">
        <div className="crumb"><button onClick={() => navigate("home")}>Accueil</button> / Commande</div>
        <h1 className="checkout__title">Finaliser ma commande</h1>

        <div className="stepper">
          {steps.map((s, i) => (
            <div key={s} className={`stepper__item ${step === i + 1 ? "is-active" : ""} ${step > i + 1 ? "is-done" : ""}`}>
              <span className="stepper__num">{step > i + 1 ? "✓" : i + 1}</span>{s}
            </div>
          ))}
        </div>

        <div className="checkout__layout">
          <div className="checkout__main">
            {step === 1 && (
              <div className="ck-card">
                <h3>Mode de réception</h3>
                <div className="modes">
                  <button className={`mode ${mode === "retrait" ? "is-active" : ""}`} onClick={() => setMode("retrait")}>
                    <span className="mode__ic"><Ic d={ICON.shop} size={26} /></span>
                    <div><strong>Retrait en boutique</strong><span>Prêt en 1 h · Papeete</span></div>
                    <span className="mode__price">Gratuit</span>
                  </button>
                  <button className={`mode ${mode === "livraison" ? "is-active" : ""}`} onClick={() => setMode("livraison")}>
                    <span className="mode__ic"><Ic d={ICON.truck} size={26} /></span>
                    <div><strong>Livraison Tahiti & îles</strong><span>2 à 5 jours ouvrés</span></div>
                    <span className="mode__price">{F(990)}</span>
                  </button>
                </div>
                <div className="ck-grid">
                  <Field label="Prénom" placeholder="Teiva" />
                  <Field label="Nom" placeholder="a Tahiti" />
                  <Field label="Téléphone" placeholder="87 12 34 56" />
                  <Field label="E-mail" placeholder="vous@exemple.pf" />
                  {mode === "livraison" && <>
                    <Field label="Adresse" placeholder="Quartier, rue…" className="span2" />
                    <Field label="Commune / île" placeholder="Papeete, Moorea…" />
                    <Field label="Code postal" placeholder="98714" />
                  </>}
                </div>
                <Btn variant="primary" size="lg" onClick={() => setStep(2)}>Continuer vers le paiement</Btn>
              </div>
            )}

            {step === 2 && (
              <div className="ck-card">
                <h3>Paiement <span className="mockpill">démo aucun paiement réel</span></h3>
                <div className="ck-grid">
                  <Field label="Numéro de carte" placeholder="4242 4242 4242 4242" className="span2" />
                  <Field label="Expiration" placeholder="12 / 28" />
                  <Field label="CVC" placeholder="123" />
                  <Field label="Titulaire" placeholder="TEIVA A TAHITI" className="span2" />
                </div>
                <div className="ck-actions">
                  <button className="ck-back" onClick={() => setStep(1)}>← Retour</button>
                  <Btn variant="primary" size="lg" onClick={() => setStep(3)}>Vérifier ma commande</Btn>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="ck-card">
                <h3>Récapitulatif</h3>
                <div className="recap">
                  {cartLines.map((l) => (
                    <div className="recap__line" key={l.id}>
                      <span className="recap__qty">{l.qty}×</span>
                      <span className="recap__name">{l.product.name}</span>
                      <Price value={l.product.price * l.qty} />
                    </div>
                  ))}
                </div>
                <div className="recap__mode">{mode === "retrait" ? <><Ic d={ICON.shop} size={16} /> Retrait en boutique Papeete</> : <><Ic d={ICON.truck} size={16} /> Livraison Tahiti &amp; îles</>}</div>
                <div className="ck-actions">
                  <button className="ck-back" onClick={() => setStep(2)}>← Retour</button>
                  <Btn variant="sun" size="lg" onClick={placeOrder}>Valider la commande · {F(total)}</Btn>
                </div>
              </div>
            )}
          </div>

          <aside className="ordersum">
            <h4>Votre commande</h4>
            <div className="ordersum__lines">
              {cartLines.map((l) => (
                <div className="ordersum__line" key={l.id}>
                  <span>{l.qty}× {l.product.name}</span><Price value={l.product.price * l.qty} />
                </div>
              ))}
            </div>
            <div className="ordersum__row"><span>Sous-total</span><Price value={cartSubtotal} /></div>
            <div className="ordersum__row"><span>{mode === "retrait" ? "Retrait" : "Livraison"}</span><span>{livraison ? F(livraison) : "Gratuit"}</span></div>
            <div className="ordersum__total"><span>Total TTC</span><Price value={total} className="price--lg" /></div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export function ConfirmationPage() {
  const { route, navigate } = useStore();
  return (
    <div className="page confirm">
      <div className="wrap confirm__inner">
        <Mascot size={170} mood="celebrate" />
        <span className="confirm__kicker">Merci pour votre commande&nbsp;!</span>
        <h1>C'est validé !</h1>
        <p>Votre commande <strong>{route.order || "JIE-000000"}</strong> est confirmée. Un e-mail récapitulatif (factice) vient de partir.</p>
        <div className="confirm__box">
          {route.mode === "livraison"
            ? <p><Ic d={ICON.truck} size={17} style={{ color: "var(--brand)" }} /> <strong>Livraison Tahiti &amp; îles</strong><br />Vous serez prévenu dès l'expédition (2 à 5 jours ouvrés).</p>
            : <p><Ic d={ICON.shop} size={17} style={{ color: "var(--brand)" }} /> <strong>Retrait en boutique</strong><br />Votre commande sera prête en 1 h au 89 Rue Dumont d'Urville, Papeete.</p>}
          {route.total != null && <p className="confirm__total">Total réglé&nbsp;: <strong>{F(route.total)}</strong></p>}
        </div>
        <div className="confirm__cta">
          <Btn variant="primary" size="lg" onClick={() => navigate({ name: "catalogue" })}>Continuer mes achats</Btn>
          <Btn variant="outline" size="lg" onClick={() => navigate("home")}>Retour à l'accueil</Btn>
        </div>
      </div>
    </div>
  );
}
