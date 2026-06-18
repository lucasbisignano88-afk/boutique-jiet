import React, { useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { StoreProvider, useStore } from './store.jsx'
import { Header, TabBar, Footer } from './chrome.jsx'
import { Toast } from './components.jsx'
import { CartDrawer, StorePage } from './cart.jsx'
import { CataloguePage } from './catalogue.jsx'
import { ProductPage } from './product.jsx'
import { CheckoutPage, ConfirmationPage } from './checkout.jsx'
import { HomePage } from './home.jsx'
import { HomeMarketplace } from './home-mkt.jsx'
import { HomeEditorial } from './home-editorial.jsx'
import { TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSelect, TweakSlider, useTweaks } from './tweaks-panel.jsx'
import './styles.css'

const TWEAK_DEFAULTS = {
  "homeLayout": "editorial",
  "heroStyle": "playful",
  "brandRed": "#F0473C",
  "font": "gabarito",
  "radius": 18
};

const FONTS = {
  gabarito:  { display: "'Gabarito', sans-serif",  body: "'Hanken Grotesk', sans-serif", label: "Gabarito · Hanken" },
  fredoka:   { display: "'Fredoka', sans-serif",   body: "'Mulish', sans-serif",          label: "Fredoka · Mulish" },
  unbounded: { display: "'Unbounded', sans-serif", body: "'Mulish', sans-serif",           label: "Unbounded · Mulish" },
  bricolage: { display: "'Bricolage Grotesque', sans-serif", body: "'Hanken Grotesk', sans-serif", label: "Bricolage · Hanken" },
  baloo:     { display: "'Baloo 2', sans-serif",   body: "'Nunito Sans', sans-serif",      label: "Baloo · Nunito" },
};

// Module-level ref so Router can access tweaks without prop drilling
export let tweaksRef = { current: [TWEAK_DEFAULTS, () => {}] };

function HomeSwitch({ layout, heroStyle }) {
  if (layout === "boutique") return <HomePage heroVariant={heroStyle} />;
  if (layout === "marketplace") return <HomeMarketplace />;
  return <HomeEditorial />;
}

function Router() {
  const { route } = useStore();
  const [t] = tweaksRef.current;
  switch (route.name) {
    case "catalogue": return <CataloguePage />;
    case "product": return <ProductPage />;
    case "store": return <StorePage />;
    case "checkout": return <CheckoutPage />;
    case "confirmation": return <ConfirmationPage />;
    default: return <HomeSwitch layout={t.homeLayout} heroStyle={t.heroStyle} />;
  }
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const ref = useRef([t, setTweak]);
  ref.current = [t, setTweak];
  tweaksRef = ref;

  const font = FONTS[t.font] || FONTS.gabarito;
  const rootStyle = {
    "--brand": t.brandRed,
    "--radius": t.radius + "px",
    "--font-display": font.display,
    "--font-body": font.body,
  };

  return (
    <StoreProvider>
      <div className="app" style={rootStyle}>
        <Header />
        <main><Router /></main>
        <Footer />
        <CartDrawer />
        <TabBar />
        <Toast />
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Accueil" />
        <TweakRadio label="Mise en page" value={t.homeLayout} options={["editorial", "marketplace", "boutique"]} onChange={(v) => setTweak("homeLayout", v)} />
        <TweakRadio label="Hero (mode boutique)" value={t.heroStyle} options={["classic", "playful", "split"]} onChange={(v) => setTweak("heroStyle", v)} />

        <TweakSection label="Couleur" />
        <TweakColor label="Rouge de marque" value={t.brandRed}
          options={["#F0473C", "#E1322B", "#D72E3F", "#C8102E"]} onChange={(v) => setTweak("brandRed", v)} />

        <TweakSection label="Typographie" />
        <TweakSelect label="Police" value={t.font}
          options={Object.keys(FONTS).map((k) => ({ value: k, label: FONTS[k].label }))}
          onChange={(v) => setTweak("font", v)} />

        <TweakSection label="Formes" />
        <TweakSlider label="Arrondi" value={t.radius} min={4} max={28} unit="px" onChange={(v) => setTweak("radius", v)} />
      </TweaksPanel>
    </StoreProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
