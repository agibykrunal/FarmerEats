//ok it is at top of all
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* ─── Data ─── */
const ALL_PRODUCTS = [
  { emoji:'🍅', name:'Organic Tomatoes',   farm:'Green Valley Farm',   price:'$3.99 / lb',    rawPrice:3.99, badge:'New',      category:'Veggies' },
  { emoji:'🥬', name:'Baby Spinach',        farm:'Sunrise Organics',    price:'$2.49 / bunch',  rawPrice:2.49, badge:null,      category:'Veggies' },
  { emoji:'🥦', name:'Broccoli Crown',      farm:'Green Valley Farm',   price:'$2.99 / head',   rawPrice:2.99, badge:null,      category:'Veggies' },
  { emoji:'🥕', name:'Rainbow Carrots',     farm:'Meadowbrook Farm',    price:'$1.99 / lb',     rawPrice:1.99, badge:null,      category:'Veggies' },
  { emoji:'🌽', name:'Sweet Corn',          farm:'Sunrise Organics',    price:'$0.89 each',     rawPrice:0.89, badge:'Sale',    category:'Veggies' },
  { emoji:'🫐', name:'Wild Blueberries',    farm:'Cedar Creek Farm',    price:'$5.99 / pint',   rawPrice:5.99, badge:'Popular', category:'Fruits' },
  { emoji:'🍎', name:'Honeycrisp Apples',   farm:'Red Barn Orchard',    price:'$4.49 / lb',     rawPrice:4.49, badge:null,      category:'Fruits' },
  { emoji:'🍓', name:'Strawberries',        farm:'Meadowbrook Farm',    price:'$3.49 / pint',   rawPrice:3.49, badge:'New',     category:'Fruits' },
  { emoji:'🍋', name:'Meyer Lemons',        farm:'Sunshine Grove',      price:'$1.29 each',     rawPrice:1.29, badge:null,      category:'Fruits' },
  { emoji:'🍇', name:'Concord Grapes',      farm:'Cedar Creek Farm',    price:'$4.99 / lb',     rawPrice:4.99, badge:null,      category:'Fruits' },
  { emoji:'🥚', name:'Free-range Eggs',     farm:'Happy Hen Farm',      price:'$5.99 / dozen',  rawPrice:5.99, badge:'Popular', category:'Dairy' },
  { emoji:'🧀', name:'Fresh Goat Cheese',   farm:'Clover Fields Dairy', price:'$6.49 / 4oz',    rawPrice:6.49, badge:null,      category:'Dairy' },
  { emoji:'🥛', name:'Raw Whole Milk',      farm:'Happy Hen Farm',      price:'$4.99 / qt',     rawPrice:4.99, badge:null,      category:'Dairy' },
  { emoji:'🌿', name:'Fresh Basil',         farm:'Herb Haven',          price:'$1.99 / bunch',  rawPrice:1.99, badge:null,      category:'Herbs' },
  { emoji:'🌱', name:'Organic Mint',        farm:'Herb Haven',          price:'$1.49 / bunch',  rawPrice:1.49, badge:null,      category:'Herbs' },
  { emoji:'🫙', name:'Local Raw Honey',     farm:'Busy Bee Apiary',     price:'$9.99 / 12oz',   rawPrice:9.99, badge:null,      category:'Preserved' },
  { emoji:'🍯', name:'Apple Butter',        farm:'Red Barn Orchard',    price:'$7.49 / jar',    rawPrice:7.49, badge:'New',     category:'Preserved' },
];

const CATEGORIES = ['All','Veggies','Fruits','Dairy','Herbs','Preserved'];
const CAT_ICONS   = { All:'🌾', Veggies:'🥦', Fruits:'🍓', Dairy:'🥚', Herbs:'🌿', Preserved:'🫙' };

/* ─── Icons (SVG) ─── */
const Icon = {
  Home: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 12L12 4l9 8" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Explore: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={c} strokeWidth="2"/>
      <path d="M20 20l-3-3" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Cart: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="3" y1="6" x2="21" y2="6" stroke={c} strokeWidth="2"/>
      <path d="M16 10a4 4 0 01-8 0" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Profile: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="7" r="4" stroke={c} strokeWidth="2"/>
    </svg>
  ),
};

/* ─── Product Card ─── */
function ProductCard({ product, onAdd, cartQty, desktop }) {
  const [flash, setFlash] = useState(false);
  function handleAdd() { onAdd(product); setFlash(true); setTimeout(() => setFlash(false), 500); }
  const active = flash || cartQty > 0;
  return (
    <div style={{
      background:'var(--white)', border:'1px solid var(--border)', borderRadius:16,
      padding: desktop ? '16px 20px' : '14px 16px',
      display:'flex', alignItems:'center', gap:14,
      transition:'box-shadow 0.2s, transform 0.15s',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.08)'; e.currentTarget.style.transform='translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'; }}
    >
      <div style={{ width:desktop?64:56, height:desktop?64:56, borderRadius:14, background:'var(--primary-light)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:desktop?32:26, flexShrink:0 }}>
        {product.emoji}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:desktop?16:15, fontWeight:700, color:'var(--text)' }}>{product.name}</div>
        <div style={{ fontSize:13, color:'var(--text-muted)', marginTop:2 }}>{product.farm}</div>
        <div style={{ fontSize:desktop?16:15, fontWeight:800, color:'var(--primary)', marginTop:4 }}>{product.price}</div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8, flexShrink:0 }}>
        {product.badge && (
          <div style={{ padding:'3px 10px', background:'var(--primary-light)', color:'var(--primary-dark)', borderRadius:20, fontSize:11, fontWeight:800 }}>{product.badge}</div>
        )}
        <button onClick={handleAdd} style={{
          width:36, height:36, borderRadius:'50%',
          background: active ? 'var(--primary)' : 'var(--white)',
          border:'1.5px solid var(--primary)',
          color: active ? '#fff' : 'var(--primary)',
          fontSize: cartQty > 0 ? 13 : 20, fontWeight:900,
          cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          transition:'all 0.2s', fontFamily:'var(--font)',
        }}>
          {cartQty > 0 ? cartQty : '+'}
        </button>
      </div>
    </div>
  );
}

/* ─── HOME TAB ─── */
function HomeTab({ onAdd, cart, desktop, setTab }) {
  const cartMap = Object.fromEntries(cart.map(i => [i.name, i.qty]));
  const cols = desktop ? 2 : 1;
  return (
    <div style={{ padding: desktop ? '32px 40px' : '20px 16px 20px' }}>
      {/* Banner */}
      <div style={{
        background:'linear-gradient(120deg,#D97B5A,#E8956D)',
        borderRadius:20, padding: desktop ? '28px 36px' : '20px 22px',
        marginBottom:28, display:'flex', justifyContent:'space-between', alignItems:'center',
      }}>
        <div>
          <div style={{ fontSize: desktop?22:17, fontWeight:900, color:'#fff', marginBottom:6 }}>Welcome to FarmerEats! 🎉</div>
          <div style={{ fontSize: desktop?15:13, color:'rgba(255,255,255,0.88)', lineHeight:1.5 }}>You're connected to 12+ local farms. Fresh produce delivered daily.</div>
        </div>
        <div style={{ fontSize: desktop?60:36, flexShrink:0 }}>🌿</div>
      </div>

      {/* Categories */}
      <div style={{ marginBottom:28 }}>
        <div style={{ fontSize:desktop?18:16, fontWeight:800, color:'var(--text)', marginBottom:14 }}>Categories</div>
        <div style={{ display:'flex', gap:10, flexWrap: desktop ? 'wrap' : 'nowrap', overflowX: desktop ? 'visible' : 'auto', paddingBottom:4 }}>
          {CATEGORIES.filter(c => c !== 'All').map(cat => (
            <div key={cat} onClick={() => setTab('explore')} style={{
              flexShrink:0, padding:'10px 18px', background:'var(--bg)', color:'var(--text)',
              borderRadius:50, fontSize:13, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap',
              border:'1.5px solid var(--border)', display:'flex', alignItems:'center', gap:6,
              transition:'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--primary-light)'; e.currentTarget.style.borderColor='var(--primary)'; e.currentTarget.style.color='var(--primary-dark)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--bg)'; e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text)'; }}
            >
              <span>{CAT_ICONS[cat]}</span> {cat}
            </div>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div style={{ fontSize:desktop?18:16, fontWeight:800, color:'var(--text)', marginBottom:16 }}>Fresh Picks Today</div>
      <div style={{ display:'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap:12 }}>
        {ALL_PRODUCTS.slice(0,8).map(p => (
          <ProductCard key={p.name} product={p} onAdd={onAdd} cartQty={cartMap[p.name]||0} desktop={desktop} />
        ))}
      </div>
    </div>
  );
}

/* ─── EXPLORE TAB ─── */
function ExploreTab({ onAdd, cart, desktop }) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const cartMap = Object.fromEntries(cart.map(i => [i.name, i.qty]));
  const filtered = ALL_PRODUCTS.filter(p =>
    (cat === 'All' || p.category === cat) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.farm.toLowerCase().includes(search.toLowerCase()))
  );
  const cols = desktop ? 2 : 1;

  return (
    <div style={{ padding: desktop ? '32px 40px' : '20px 16px 20px' }}>
      {/* Search */}
      <div style={{ position:'relative', marginBottom:20 }}>
        <span style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', fontSize:16, color:'var(--text-muted)', pointerEvents:'none' }}>🔍</span>
        <input
          placeholder="Search farms, produce..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width:'100%', padding:'14px 16px 14px 48px',
            border:'1.5px solid var(--border)', borderRadius:14,
            fontSize:15, fontFamily:'var(--font)', color:'var(--text)',
            background:'var(--white)', outline:'none',
            transition:'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor='var(--primary)'}
          onBlur={e => e.target.style.borderColor='var(--border)'}
        />
      </div>

      {/* Category pills */}
      <div style={{ display:'flex', gap:8, flexWrap: desktop?'wrap':'nowrap', overflowX: desktop?'visible':'auto', paddingBottom:4, marginBottom:20 }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            flexShrink:0, padding:'9px 18px',
            background: cat===c ? 'var(--primary)' : 'var(--bg)',
            color: cat===c ? '#fff' : 'var(--text)',
            borderRadius:50, fontSize:13, fontWeight:700,
            cursor:'pointer', border: cat===c ? 'none' : '1.5px solid var(--border)',
            fontFamily:'var(--font)', whiteSpace:'nowrap',
            display:'flex', alignItems:'center', gap:6, transition:'all 0.2s',
          }}>
            {CAT_ICONS[c]} {c}
          </button>
        ))}
      </div>

      <div style={{ fontSize:13, color:'var(--text-muted)', marginBottom:16, fontWeight:600 }}>
        {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:'80px 20px', color:'var(--text-muted)' }}>
          <div style={{ fontSize:56, marginBottom:14 }}>🌾</div>
          <div style={{ fontSize:18, fontWeight:800, marginBottom:6 }}>Nothing found</div>
          <div style={{ fontSize:14 }}>Try a different search or category</div>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols}, 1fr)`, gap:12 }}>
          {filtered.map(p => <ProductCard key={p.name} product={p} onAdd={onAdd} cartQty={cartMap[p.name]||0} desktop={desktop} />)}
        </div>
      )}
    </div>
  );
}

/* ─── CART TAB ─── */
function CartTab({ cart, onAdd, onRemove, cartTotal, onClear, desktop }) {
  const [ordered, setOrdered] = useState(false);

  if (ordered) return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:400, padding:'40px 28px', textAlign:'center', gap:16, animation:'fadeIn 0.4s ease' }}>
      <div style={{ fontSize:80 }}>✅</div>
      <div style={{ fontSize:26, fontWeight:900, color:'var(--text)' }}>Order Placed!</div>
      <div style={{ fontSize:15, color:'var(--text-muted)', lineHeight:1.7, maxWidth:340 }}>Your fresh produce is on its way from local farms. Estimated delivery: 2–4 hours.</div>
      <button onClick={() => { onClear(); setOrdered(false); }} style={{ marginTop:16, padding:'14px 40px', background:'var(--primary)', color:'#fff', border:'none', borderRadius:50, fontSize:15, fontWeight:800, cursor:'pointer', fontFamily:'var(--font)' }}>
        Continue Shopping
      </button>
    </div>
  );

  if (cart.length === 0) return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:400, padding:'40px 28px', textAlign:'center' }}>
      <div style={{ fontSize:72, marginBottom:16 }}>🛒</div>
      <div style={{ fontSize:22, fontWeight:800, color:'var(--text)', marginBottom:8 }}>Your cart is empty</div>
      <div style={{ fontSize:14, color:'var(--text-muted)' }}>Add some fresh produce to get started!</div>
    </div>
  );

  return (
    <div style={{ display:'flex', flexDirection: desktop ? 'row' : 'column', gap: desktop ? 32 : 0, padding: desktop ? '32px 40px' : '0', alignItems:'flex-start' }}>
      {/* Items */}
      <div style={{ flex:1, padding: desktop ? 0 : '20px 16px' }}>
        <div style={{ fontSize:desktop?18:17, fontWeight:800, color:'var(--text)', marginBottom:16 }}>
          Your Cart ({cart.reduce((s,i)=>s+i.qty,0)} items)
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {cart.map(item => (
            <div key={item.name} style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:16, padding:'14px 18px', display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:52, height:52, borderRadius:12, background:'var(--primary-light)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, flexShrink:0 }}>{item.emoji}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:15, fontWeight:700, color:'var(--text)' }}>{item.name}</div>
                <div style={{ fontSize:13, fontWeight:700, color:'var(--primary)', marginTop:3 }}>{item.price}</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
                <button onClick={() => onRemove(item.name)} style={{ width:34,height:34,borderRadius:'50%',border:'1.5px solid var(--border)',background:'var(--white)',fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--text-muted)',fontFamily:'var(--font)' }}>−</button>
                <span style={{ fontSize:16,fontWeight:900,minWidth:24,textAlign:'center' }}>{item.qty}</span>
                <button onClick={() => onAdd(item)} style={{ width:34,height:34,borderRadius:'50%',border:'none',background:'var(--primary)',fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontFamily:'var(--font)' }}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div style={{ width: desktop ? 320 : 'auto', flexShrink:0, padding: desktop ? '0' : '0 16px 24px', position: desktop ? 'sticky' : 'static', top: desktop ? 100 : 'auto' }}>
        <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:20, padding:'24px 24px' }}>
          <div style={{ fontSize:16, fontWeight:800, marginBottom:20 }}>Order Summary</div>
          {cart.map(item => (
            <div key={item.name} style={{ display:'flex', justifyContent:'space-between', marginBottom:10, fontSize:14 }}>
              <span style={{ color:'var(--text-muted)' }}>{item.name} × {item.qty}</span>
              <span style={{ fontWeight:700 }}>${(item.rawPrice * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ height:1, background:'var(--border)', margin:'16px 0' }} />
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
            <span style={{ fontSize:14, color:'var(--text-muted)' }}>Subtotal</span>
            <span style={{ fontSize:14, fontWeight:700 }}>${cartTotal.toFixed(2)}</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
            <span style={{ fontSize:14, color:'var(--text-muted)' }}>Delivery</span>
            <span style={{ fontSize:14, fontWeight:700, color:'#16A34A' }}>FREE</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:22, paddingTop:14, borderTop:'2px solid var(--border)' }}>
            <span style={{ fontSize:17, fontWeight:900 }}>Total</span>
            <span style={{ fontSize:20, fontWeight:900, color:'var(--primary)' }}>${cartTotal.toFixed(2)}</span>
          </div>
          <button onClick={() => setOrdered(true)} style={{ width:'100%', padding:'16px', background:'var(--primary)', color:'#fff', border:'none', borderRadius:50, fontSize:16, fontWeight:800, cursor:'pointer', fontFamily:'var(--font)', transition:'background 0.2s' }}
            onMouseEnter={e => e.target.style.background='var(--primary-dark)'}
            onMouseLeave={e => e.target.style.background='var(--primary)'}
          >
            Place Order · ${cartTotal.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── PROFILE TAB ─── */
function ProfileTab({ user, onLogout, desktop }) {
  const initials = (user?.name||'U').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
  const fields = [
    { icon:'👤', label:'Full Name',     value: user?.name||'—' },
    { icon:'✉️', label:'Email',         value: user?.email||'—' },
    { icon:'🎂', label:'Date of Birth', value: user?.dob||'Not provided' },
    { icon:'📱', label:'Phone',         value: user?.phone||'Not provided' },
  ];

  return (
    <div style={{ padding: desktop ? '40px' : '24px 16px 32px', maxWidth: desktop ? 700 : '100%' }}>
      {/* Avatar header */}
      <div style={{ display:'flex', alignItems: desktop ? 'center' : 'center', flexDirection: desktop ? 'row' : 'column', gap: desktop ? 28 : 0, marginBottom:36, textAlign: desktop ? 'left' : 'center' }}>
        <div style={{ width:96, height:96, borderRadius:'50%', background:'linear-gradient(135deg,#D97B5A,#E8956D)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, fontWeight:900, color:'#fff', boxShadow:'0 8px 28px rgba(217,123,90,0.35)', flexShrink:0, marginBottom: desktop ? 0 : 16 }}>
          {initials}
        </div>
        <div>
          <div style={{ fontSize: desktop?26:22, fontWeight:900, color:'var(--text)' }}>{user?.name||'User'}</div>
          <div style={{ fontSize:14, color:'var(--text-muted)', marginTop:4 }}>{user?.email}</div>
          <div style={{ display:'inline-block', marginTop:10, padding:'5px 14px', background:'var(--primary-light)', color:'var(--primary-dark)', borderRadius:20, fontSize:12, fontWeight:800 }}>🌾 FarmerEats Member</div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns: desktop ? '1fr 1fr' : '1fr', gap:16 }}>
        {/* Account Info */}
        <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:20, overflow:'hidden' }}>
          <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--border)', fontSize:12, fontWeight:800, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.5px' }}>Account Info</div>
          {fields.map((f,i,arr) => (
            <div key={f.label} style={{ padding:'16px 20px', borderBottom: i<arr.length-1?'1px solid var(--border)':'none', display:'flex', alignItems:'center', gap:14 }}>
              <span style={{ fontSize:20, width:26, textAlign:'center', flexShrink:0 }}>{f.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:11, color:'var(--text-muted)', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.3px', marginBottom:3 }}>{f.label}</div>
                <div style={{ fontSize:15, fontWeight:700, color:'var(--text)', wordBreak:'break-all' }}>{f.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Preferences + Logout */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:20, overflow:'hidden' }}>
            <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--border)', fontSize:12, fontWeight:800, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.5px' }}>Preferences</div>
            {[
              { icon:'🔔', label:'Notifications', value:'Enabled' },
              { icon:'📍', label:'Location',       value:'Bhopal, MP' },
              { icon:'🌐', label:'Language',       value:'English' },
            ].map((row,i,arr) => (
              <div key={row.label} style={{ padding:'16px 20px', display:'flex', alignItems:'center', gap:14, borderBottom: i<arr.length-1?'1px solid var(--border)':'none', cursor:'pointer' }}>
                <span style={{ fontSize:20, width:26, textAlign:'center' }}>{row.icon}</span>
                <div style={{ flex:1, fontSize:15, fontWeight:600, color:'var(--text)' }}>{row.label}</div>
                <div style={{ fontSize:13, color:'var(--text-muted)', fontWeight:600 }}>{row.value} ›</div>
              </div>
            ))}
          </div>

          <button onClick={onLogout} style={{ padding:'16px', borderRadius:50, background:'#FFF2F2', border:'none', color:'#C0392B', fontSize:15, fontWeight:800, cursor:'pointer', fontFamily:'var(--font)', transition:'background 0.2s' }}
            onMouseEnter={e => e.target.style.background='#FFE5E5'}
            onMouseLeave={e => e.target.style.background='#FFF2F2'}
          >
            🚪 Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ─── */
export default function Home() {
  const navigate  = useNavigate();
  const { user, logout, cart, addToCart, removeFromCart, clearCart, cartCount, cartTotal } = useAuth();
  const [tab, setTab]         = useState('home');
  const [desktop, setDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const onResize = () => setDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  function handleLogout() { logout(); navigate('/login'); }

  const tabs = [
    { id:'home',    label:'Home',    iconFn: Icon.Home },
    { id:'explore', label:'Explore', iconFn: Icon.Explore },
    { id:'cart',    label:'Cart',    iconFn: Icon.Cart },
    { id:'profile', label:'Profile', iconFn: Icon.Profile },
  ];

  const pageTitle = { home:'Good morning! 🌾', explore:'Explore', cart:'My Cart', profile:'My Profile' };

  /* ── Desktop sidebar layout ── */
  if (desktop) {
    return (
      <div style={{ display:'flex', minHeight:'100vh', background:'var(--bg)' }}>

        {/* Sidebar */}
        <div style={{ width:220, background:'var(--white)', borderRight:'1px solid var(--border)', display:'flex', flexDirection:'column', position:'fixed', top:0, left:0, height:'100vh', zIndex:30 }}>
          {/* Logo */}
          <div style={{ padding:'28px 24px 20px' }}>
            <div style={{ fontSize:22, fontWeight:900, color:'var(--text)', letterSpacing:'-0.5px' }}>Farmer<span style={{ color:'var(--primary)' }}>Eats</span></div>
            <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:4, fontWeight:600 }}>Farm-to-table marketplace</div>
          </div>

          {/* User mini card */}
          <div style={{ margin:'0 14px 20px', padding:'12px 14px', background:'var(--primary-lighter)', borderRadius:14, display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:38, height:38, borderRadius:'50%', background:'var(--primary)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, fontWeight:900, color:'#fff', flexShrink:0 }}>
              {(user?.name||'U')[0].toUpperCase()}
            </div>
            <div style={{ minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:800, color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user?.name||'User'}</div>
              <div style={{ fontSize:11, color:'var(--text-muted)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user?.email}</div>
            </div>
          </div>

          {/* Nav items */}
          <nav style={{ flex:1, padding:'0 12px' }}>
            {tabs.map(t => {
              const active = tab === t.id;
              const color  = active ? 'var(--primary)' : 'var(--text-muted)';
              return (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  width:'100%', display:'flex', alignItems:'center', gap:12,
                  padding:'12px 14px', borderRadius:12, border:'none',
                  background: active ? 'var(--primary-light)' : 'transparent',
                  color, fontSize:14, fontWeight: active ? 800 : 600,
                  fontFamily:'var(--font)', cursor:'pointer', marginBottom:4,
                  transition:'all 0.2s', position:'relative',
                }}>
                  {t.id === 'cart' ? (
                    <div style={{ position:'relative' }}>
                      {t.iconFn(color)}
                      {cartCount > 0 && (
                        <span style={{ position:'absolute', top:-6, right:-6, background:'var(--primary)', color:'#fff', borderRadius:'50%', width:16, height:16, fontSize:9, fontWeight:900, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font)' }}>
                          {cartCount > 9 ? '9+' : cartCount}
                        </span>
                      )}
                    </div>
                  ) : t.iconFn(color)}
                  <span>{t.label}</span>
                  {t.id === 'cart' && cartCount > 0 && (
                    <span style={{ marginLeft:'auto', padding:'2px 8px', background:'var(--primary)', color:'#fff', borderRadius:20, fontSize:11, fontWeight:900 }}>{cartCount}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Logout at bottom */}
          <div style={{ padding:'16px 12px 28px' }}>
            <button onClick={handleLogout} style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'11px 14px', borderRadius:12, border:'none', background:'transparent', color:'#C0392B', fontSize:14, fontWeight:700, fontFamily:'var(--font)', cursor:'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="#C0392B" strokeWidth="2" strokeLinecap="round"/><polyline points="16 17 21 12 16 7" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="21" y1="12" x2="9" y2="12" stroke="#C0392B" strokeWidth="2" strokeLinecap="round"/></svg>
              Sign Out
            </button>
          </div>
        </div>

        {/* Main content */}
        <div style={{ marginLeft:220, flex:1, display:'flex', flexDirection:'column', minHeight:'100vh' }}>
          {/* Top bar */}
          <div style={{ background:'var(--white)', borderBottom:'1px solid var(--border)', padding:'18px 40px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:20 }}>
            <div>
              <div style={{ fontSize:24, fontWeight:900, color:'var(--text)' }}>{pageTitle[tab]}</div>
              {tab==='home' && <div style={{ fontSize:14, color:'var(--text-muted)', marginTop:2 }}>Discover fresh farm products near you</div>}
            </div>
            {(tab==='home' || tab==='explore') && (
              <div onClick={() => setTab('explore')} style={{ display:'flex', alignItems:'center', gap:10, background:'var(--bg)', borderRadius:12, padding:'10px 18px', cursor:'text', minWidth:260 }}>
                <span style={{ fontSize:16 }}>🔍</span>
                <span style={{ fontSize:14, color:'var(--text-light)' }}>Search fresh produce...</span>
              </div>
            )}
          </div>

          {/* Page */}
          <div style={{ flex:1, overflowY:'auto' }}>
            {tab==='home'    && <HomeTab    onAdd={addToCart} cart={cart} desktop={true} setTab={setTab} />}
            {tab==='explore' && <ExploreTab onAdd={addToCart} cart={cart} desktop={true} />}
            {tab==='cart'    && <CartTab    cart={cart} onAdd={addToCart} onRemove={removeFromCart} cartTotal={cartTotal} onClear={clearCart} desktop={true} />}
            {tab==='profile' && <ProfileTab user={user} onLogout={handleLogout} desktop={true} />}
          </div>
        </div>
      </div>
    );
  }

  /* ── Mobile layout ── */
  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', background:'var(--white)' }}>
      {/* Mobile header */}
      <div style={{ background:'var(--white)', padding:'16px 16px 12px', borderBottom:'1px solid var(--border)', position:'sticky', top:0, zIndex:20 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: (tab==='home'||tab==='explore') ? 12 : 0 }}>
          <div>
            <div style={{ fontSize:20, fontWeight:900, color:'var(--text)' }}>{pageTitle[tab]}</div>
            {tab==='home' && <div style={{ fontSize:13, color:'var(--text-muted)', marginTop:2 }}>Fresh produce near you</div>}
          </div>
          <div onClick={() => setTab('profile')} style={{ width:40, height:40, borderRadius:'50%', background:'var(--primary-light)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, cursor:'pointer', fontWeight:900, color:'var(--primary)' }}>
            {(user?.name||'U')[0].toUpperCase()}
          </div>
        </div>
        {(tab==='home'||tab==='explore') && (
          <div onClick={() => setTab('explore')} style={{ display:'flex', alignItems:'center', gap:10, background:'var(--bg)', borderRadius:12, padding:'10px 14px', cursor:'text' }}>
            <span style={{ fontSize:15 }}>🔍</span>
            <span style={{ fontSize:13, color:'var(--text-light)' }}>Search fresh produce...</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex:1, overflowY:'auto', paddingBottom:70 }}>
        {tab==='home'    && <HomeTab    onAdd={addToCart} cart={cart} desktop={false} setTab={setTab} />}
        {tab==='explore' && <ExploreTab onAdd={addToCart} cart={cart} desktop={false} />}
        {tab==='cart'    && <CartTab    cart={cart} onAdd={addToCart} onRemove={removeFromCart} cartTotal={cartTotal} onClear={clearCart} desktop={false} />}
        {tab==='profile' && <ProfileTab user={user} onLogout={handleLogout} desktop={false} />}
      </div>

      {/* Mobile bottom tab bar */}
      <div style={{ display:'flex', borderTop:'1px solid var(--border)', background:'var(--white)', position:'fixed', bottom:0, left:0, right:0, zIndex:20 }}>
        {tabs.map(t => {
          const active = tab === t.id;
          const color  = active ? 'var(--primary)' : 'var(--text-muted)';
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex:1, padding:'10px 6px 12px', display:'flex', flexDirection:'column', alignItems:'center', gap:4, background: active ? 'var(--primary-lighter)' : 'none', border:'none', cursor:'pointer', position:'relative', transition:'background 0.2s' }}>
              {t.id === 'cart' ? (
                <div style={{ position:'relative' }}>
                  {Icon.Cart(color)}
                  {cartCount > 0 && <span style={{ position:'absolute', top:-6, right:-6, background:'var(--primary)', color:'#fff', borderRadius:'50%', width:16, height:16, fontSize:9, fontWeight:900, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font)' }}>{cartCount>9?'9+':cartCount}</span>}
                </div>
              ) : t.iconFn(color)}
              <span style={{ fontSize:10, fontFamily:'var(--font)', fontWeight:700, color }}>{t.label}</span>
              {active && <div style={{ width:18, height:3, borderRadius:2, background:'var(--primary)', position:'absolute', bottom:0 }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
