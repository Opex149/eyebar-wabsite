import { useEffect, useState } from 'react';
import { ArrowLeft, Clock3, Timer, StickyNote, Maximize2, Settings2, Play, Pause, RotateCcw } from 'lucide-react';
import { base } from './content';
import './webapp.css';

const pad = (n: number) => String(n).padStart(2, '0');
export function WebEyeBar() {
  const [now, setNow] = useState(() => new Date());
  const [tab, setTab] = useState<'clock'|'timer'|'notes'|'settings'>('clock');
  const [lang, setLang] = useState<'ru'|'en'>(() => localStorage.getItem('eyebar-web-lang') === 'en' ? 'en' : 'ru');
  const [theme, setTheme] = useState(() => localStorage.getItem('eyebar-web-theme') || 'blue');
  const [character, setCharacter] = useState(() => localStorage.getItem('eyebar-web-character') || 'classic-blue');
  const [notes, setNotes] = useState(() => localStorage.getItem('eyebar-web-notes') || '');
  const [seconds, setSeconds] = useState(300);
  const [running, setRunning] = useState(false);
  const [standby, setStandby] = useState(false);
  useEffect(() => { const t = window.setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => { if (!running) return; const t = window.setInterval(() => setSeconds(s => { if (s <= 1) { setRunning(false); return 0; } return s - 1; }), 1000); return () => clearInterval(t); }, [running]);
  useEffect(() => { localStorage.setItem('eyebar-web-notes', notes); }, [notes]);
  useEffect(() => { localStorage.setItem('eyebar-web-theme', theme); }, [theme]);
  useEffect(() => { localStorage.setItem('eyebar-web-character', character); }, [character]);
  useEffect(() => { localStorage.setItem('eyebar-web-lang', lang); document.documentElement.lang = lang; }, [lang]);
  const en = lang === 'en';
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const date = now.toLocaleDateString(en ? 'en-US' : 'ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
  const back = () => { window.location.href = base; };
  return <main className={`webeye theme-${theme} ${standby ? 'is-standby' : ''}`}>
    {!standby && <header className="webeye-head"><button onClick={back} aria-label={en ? 'Website' : 'На сайт'}><ArrowLeft size={20}/></button><strong>EyeBar <small>Web</small></strong><button onClick={() => setLang(en ? 'ru' : 'en')}>{en ? 'EN' : 'RU'}</button></header>}
    <div className="webeye-body">
      {standby ? <div className="webeye-standby" onClick={() => setStandby(false)} role="button" tabIndex={0} onKeyDown={e => { if(e.key==='Enter'||e.key==='Escape') setStandby(false); }}>
        <span>{date}</span><strong>{time}</strong><img src={`${base}media/${character}.webp`} alt="EyeBar"/><small>{en ? 'Tap to exit StandBy' : 'Нажми, чтобы выйти из StandBy'}</small>
      </div> : <>
      <section className="webeye-clock"><p>{date}</p><strong>{time}<span>:{pad(now.getSeconds())}</span></strong><img src={`${base}media/${character}.webp`} alt="EyeBar"/><button className="webeye-standby-btn" onClick={() => setStandby(true)}><Maximize2 size={16}/> StandBy</button></section>
      <nav className="webeye-tabs" aria-label="EyeBar"><button className={tab==='clock'?'active':''} onClick={()=>setTab('clock')}><Clock3 size={19}/>{en?'Home':'Главная'}</button><button className={tab==='timer'?'active':''} onClick={()=>setTab('timer')}><Timer size={19}/>{en?'Timer':'Таймер'}</button><button className={tab==='notes'?'active':''} onClick={()=>setTab('notes')}><StickyNote size={19}/>{en?'Notes':'Заметки'}</button><button className={tab==='settings'?'active':''} onClick={()=>setTab('settings')}><Settings2 size={19}/>{en?'Style':'Стиль'}</button></nav>
      <section className="webeye-panel">
      {tab==='clock' && <><h2>{en?'Welcome to EyeBar Web':'Привет! Это EyeBar Web'}</h2><p>{en?'A browser version with live clock, timer, notes and StandBy.':'Браузерная версия с живыми часами, таймером, заметками и StandBy.'}</p><p className="webeye-hint">{en?'Works on iPhone and Android.':'Работает на iPhone и Android.'}</p></>}
      {tab==='timer' && <><h2>{en?'Timer':'Таймер'}</h2><div className="webeye-countdown">{pad(Math.floor(seconds/60))}:{pad(seconds%60)}</div><div className="webeye-controls"><button onClick={()=>setRunning(!running)}>{running?<Pause size={19}/>:<Play size={19}/>} {running?(en?'Pause':'Пауза'):(en?'Start':'Старт')}</button><button onClick={()=>{setRunning(false);setSeconds(300);}}><RotateCcw size={19}/></button></div><div className="webeye-presets">{[60,300,600,1500].map(s=><button key={s} onClick={()=>{setRunning(false);setSeconds(s);}}>{s/60} {en?'min':'мин'}</button>)}</div></>}
      {tab==='notes' && <><h2>{en?'My notes':'Мои заметки'}</h2><textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder={en?'Write something...':'Напиши что-нибудь...'} rows={7}/><p className="webeye-hint">{en?'Saved on this device.':'Сохраняются на этом устройстве.'}</p></>}
      {tab==='settings' && <><h2>{en?'Appearance':'Внешний вид'}</h2><p>{en?'Character':'Персонаж'}</p><div className="webeye-presets">{[['classic-blue','Classic Blue'],['cyber-cat','Cyber Cat']].map(([id,name])=><button className={character===id?'chosen':''} key={id} onClick={()=>setCharacter(id)}>{name}</button>)}</div><p>{en?'Accent':'Подсветка'}</p><div className="webeye-presets">{[['blue',en?'Blue':'Синий'],['violet',en?'Violet':'Фиолетовый'],['mint',en?'Mint':'Мятный']].map(([id,name])=><button className={theme===id?'chosen':''} key={id} onClick={()=>setTheme(id)}>{name}</button>)}</div></>}
      </section></>}
    </div>
  </main>;
}
