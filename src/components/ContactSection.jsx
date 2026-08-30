import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO, CONTACT_CHANNELS } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { Mail, Phone, MapPin, Copy, Check, Send, Radio, Terminal, Shield, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';

const LinkedInIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63 1.63-.73 1.63-1.63-.73-1.63-1.63-1.63Z" />
  </svg>
);

export default function ContactSection() {
  const { jumpToWaypoint, triggerSound } = useTheme();
  const [copiedChannel, setCopiedChannel] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', subject: 'Robotics Project Inquiry' });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmitted, setTransmitted] = useState(false);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedChannel(id);
    triggerSound('click');
    setTimeout(() => setCopiedChannel(null), 2500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsTransmitting(true);
    triggerSound('transition');

    setTimeout(() => {
      setIsTransmitting(false);
      setTransmitted(true);
      triggerSound('modal');
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00f0ff', '#38bdf8', '#84cc16', '#ffffff']
      });

      // Construct mailto link as fallback to ensure message delivery
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        `[PORTFOLIO CONTACT] ${formData.subject} - from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.open(mailtoUrl, '_blank');
    }, 800);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Mail': return <Mail className="w-5 h-5" />;
      case 'Phone': return <Phone className="w-5 h-5" />;
      case 'Linkedin': return <LinkedInIcon className="w-5 h-5" />;
      case 'MapPin': return <MapPin className="w-5 h-5" />;
      default: return <Radio className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between pointer-events-auto"
    >
      {/* Zone Header Banner */}
      <div>
        <div className="mb-12 border-l-4 border-cyan-500 pl-4 sm:pl-6 bg-cyan-950/20 py-4 rounded-r-xl backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>ZONE 05 // MISSION TRANSMIT // COMMS BEACON</span>
          </div>
          <h2 className="mt-1 font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            MISSION: <span className="text-cyan-400 font-light">GET IN TOUCH</span>
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-3xl">
            Direct telemetry channels open for UAV engineering roles, autonomous robotics projects, consulting, and research collaborations.
          </p>
        </div>

        {/* Main Grid: Contact Channels HUD Buttons & Quick Transmission Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: 4 HUD Contact Buttons (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="font-mono text-xs text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-2 font-semibold">
              <Terminal className="w-4 h-4" />
              <span>DIRECT COMMS CHANNELS:</span>
            </div>

            {CONTACT_CHANNELS.map((channel) => {
              const isCopied = copiedChannel === channel.id;

              return (
                <div
                  key={channel.id}
                  className="hud-card p-4 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:bg-cyan-500/20 transition-all">
                      {getIcon(channel.icon)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-cyan-400/80 font-bold uppercase">
                          {channel.label}
                        </span>
                        <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-white/5 text-slate-400 border border-white/10">
                          {channel.badge}
                        </span>
                      </div>
                      <a
                        href={channel.href}
                        target={channel.id === 'linkedin' || channel.id === 'location' ? '_blank' : undefined}
                        rel="noreferrer"
                        className="font-display font-semibold text-sm sm:text-base text-white hover:text-cyan-300 transition-colors block mt-0.5"
                      >
                        {channel.display || channel.value}
                      </a>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {channel.subtext}
                      </div>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(channel.id, channel.value)}
                    title={`Copy ${channel.label}`}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Column: Transmission Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="hud-card p-6 sm:p-8 rounded-xl border border-white/10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 font-display font-bold text-lg text-white">
                  <Send className="w-5 h-5 text-cyan-400" />
                  <span>TRANSMIT PACKET // SECURE FORM</span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">ENCRYPTION: ACTIVE</span>
              </div>

              {transmitted ? (
                <div className="p-6 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 font-mono">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 mx-auto flex items-center justify-center text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">TRANSMISSION RECEIVED</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Packet dispatched directly to K Vinay Reddy ({PERSONAL_INFO.email}). Telemetry handshake confirmed.
                  </p>
                  <button
                    onClick={() => {
                      setTransmitted(false);
                      setFormData({ name: '', email: '', message: '', subject: 'Robotics Project Inquiry' });
                    }}
                    className="mt-4 px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-xs text-white uppercase tracking-wider"
                  >
                    Transmit Another Packet
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1.5 uppercase">
                        SENDER IDENTITY / NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Commander / Lead Recruiter"
                        className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/15 focus:border-cyan-400 focus:outline-none text-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1.5 uppercase">
                        COMMS RETURN EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. contact@domain.com"
                        className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/15 focus:border-cyan-400 focus:outline-none text-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1.5 uppercase">
                      MISSION SUBJECT
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Subject of inquiry..."
                      className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/15 focus:border-cyan-400 focus:outline-none text-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1.5 uppercase">
                      MESSAGE PAYLOAD *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Enter technical specifications, project details, or collaboration requirements..."
                      className="w-full px-3.5 py-2.5 rounded bg-black/40 border border-white/15 focus:border-cyan-400 focus:outline-none text-white transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isTransmitting}
                    onMouseEnter={() => triggerSound('hover')}
                    className="w-full py-3.5 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-display font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isTransmitting ? (
                      <>
                        <Radio className="w-4 h-4 animate-spin" />
                        <span>DISPATCHING PACKET...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>TRANSMIT MESSAGE PACKET</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Tactical Footer */}
      <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>K VINAY REDDY // ROBOTICS & UAV SYSTEMS</span>
          <span className="text-slate-600">//</span>
          <span>© {PERSONAL_INFO.activeYear} ALL RIGHTS RESERVED</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => jumpToWaypoint(0)}
            onMouseEnter={() => triggerSound('hover')}
            className="flex items-center gap-1.5 text-cyan-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
            <span>RETURN TO HERO [SEC-00]</span>
          </button>
        </div>
      </footer>
    </section>
  );
}
