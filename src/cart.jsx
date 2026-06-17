import React from 'react'
import { JIE } from './data.js'
import { useStore, getUniverse } from './store.jsx'
import { Btn, Ic, ICON, F, Price, ProductImage, EmptyState, QtyStepper } from './components.jsx'
import { IconClose } from './chrome.jsx'

export function CartDrawer() {
  const { drawerOpen, closeCart, cartLines, cartSubtotal, setQty, removeFromCart, navigate, cartCount } = useStore();
  const suggestions = JIE.products.filter((p) => p.best && !cartLines.some((l) => l.id === p.id)).slice(0, 4);

  return (
    <>
      <div className={`drawer-scrim ${drawerOpen ? "show" : ""}`} onClick={closeCart} />
      <aside className={`cartdr ${drawerOpen ? "show" : ""}`} aria-hidden={!drawerOpen} aria-label="Panier">
        <div className="cartdr__head">
          <h3>Mon panier {cartCount > 0 && <span className="cartdr__n">{cartCount}</span>}</h3>
          <button className="hdr__icon" aria-label="Fermer" onClick={closeCart}><IconClose /></button>
        </div>

        {cartLines.length === 0 ? (
          <div className="cartdr__empty">
            <EmptyState mood="sleep" title="Votre panier est vide"
              action={<Btn variant="primary" onClick={() => { closeCart(); navigate({ name: "catalogue" }); }}>Découvrir la boutique</Btn>}>
              Ajoutez vos jeux, cartes et mangas préférés la mascotte garde votre panier au chaud.
            </EmptyState>
          </div>
        ) : (
          <>
            <div className="cartdr__lines">
              {cartLines.map((l) => (
                <div className="cline" key={l.id}>
                  <div className="cline__img" onClick={() => { closeCart(); navigate({ name: "product", id: l.id }); }}>
                    <ProductImage product={l.product} showTag={false} />
                  </div>
                  <div className="cline__info">
                    <h4 onClick={() => { closeCart(); navigate({ name: "product", id: l.id }); }}>{l.product.name}</h4>
                    <span className="cline__uni">{getUniverse(l.product.univers).short}</span>
                    <div className="cline__row">
                      <QtyStepper value={l.qty} onChange={(q) => setQty(l.id, q)} min={0} removable />
                      <Price value={l.product.price * l.qty} />
                    </div>
                  </div>
                  <button className="cline__del" aria-label="Retirer" onClick={() => removeFromCart(l.id)}><IconClose width="16" height="16" /></button>
                </div>
              ))}

              {suggestions.length > 0 && (
                <div className="cartdr__sugg">
                  <h4>On vous suggère</h4>
                  <div className="cartdr__suggrow">
                    {suggestions.map((p) => (
                      <button key={p.id} className="suggchip" onClick={() => { closeCart(); navigate({ name: "product", id: p.id }); }}>
                        <ProductImage product={p} showTag={false} />
                        <span>{p.name}</span>
                        <strong>{F(p.price)}</strong>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="cartdr__foot">
              <div className="cartdr__sub"><span>Sous-total</span><Price value={cartSubtotal} className="price--lg" /></div>
              <p className="cartdr__note"><Ic d={ICON.lock} size={14} /> Retrait gratuit en boutique · paiement sécurisé</p>
              <button className="cocta" onClick={() => { closeCart(); navigate("checkout"); }}>
                <span className="cocta__l"><Ic d={ICON.lock} size={17} /> Passer commande</span>
                <span className="cocta__r">{F(cartSubtotal)} <Ic d={ICON.arrow} size={17} /></span>
              </button>
              <button className="cartdr__cont" onClick={closeCart}>Continuer mes achats</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export function StorePage() {
  const { navigate } = useStore();
  return (
    <div className="page storepage">
      <div className="wrap">
        <div className="crumb"><button onClick={() => navigate("home")}>Accueil</button> / La boutique</div>
        <h1 className="storepage__title">La boutique</h1>
        <p className="storepage__lead">Venez nous voir au cœur de Papeete : conseils, ouvertures de boosters et toute la collection à portée de main.</p>

        <div className="storepage__grid">
          <div className="storepage__map">
            <div className="mapph mapph--big">
              <div className="mapph__grid" />
              <span className="mapph__pin"><Ic d={ICON.pin} size={46} /></span>
              <span className="mapph__tag">plan / carte interactive</span>
            </div>
          </div>
          <div className="storepage__card">
            <h3><Ic d={ICON.pin} size={18} style={{ color: "var(--brand)" }} /> Adresse</h3>
            <p>89 Rue Dumont d'Urville<br />98714 Papeete, Tahiti<br />Polynésie française</p>
            <h3><Ic d={ICON.clock} size={18} style={{ color: "var(--brand)" }} /> Horaires</h3>
            <ul className="strip__hours">
              <li><span>Lundi – Vendredi</span><strong>9h–11h · 11h30–16h30</strong></li>
              <li><span>Samedi</span><strong>8h–12h</strong></li>
              <li><span>Dimanche & jours fériés</span><strong>Fermé</strong></li>
            </ul>
            <h3><Ic d={ICON.car} size={18} style={{ color: "var(--brand)" }} /> Accès</h3>
            <p>Parking à proximité · à 2 min du front de mer de Papeete.</p>
            <div className="storepage__cta">
              <Btn variant="primary" onClick={() => navigate({ name: "catalogue" })}>Voir le catalogue</Btn>
              <a className="strip__phone" href="tel:89491491"><Ic d={ICON.phone} size={18} /> 89 49 14 91</a>
            </div>
          </div>
        </div>

        <div className="storepage__photos">
          {["devanture de la boutique", "rayon cartes à collectionner", "espace jeux de société"].map((c, i) => (
            <div className="photoph" key={i}><div className="photoph__stripes" /><span className="photoph__tag">{c}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
