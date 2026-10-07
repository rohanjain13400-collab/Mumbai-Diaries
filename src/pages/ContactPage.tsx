import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, MapPin, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 600);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#C2410C] font-semibold">
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Contact Mumbai Diaries
        </h1>
        <p className="text-stone-600 text-sm sm:text-base font-serif italic max-w-lg mx-auto">
          Have a secret neighborhood story to pitch, a legendary street food stall recommendation, or a letter for our editors? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Contact Info Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 space-y-6 shadow-xs">
            <h3 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-100 pb-3">
              Editorial Desk
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800 block">General Letters</span>
                  <span className="text-stone-500">letters@mumbaidiaries.in</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800 block">Story Pitches</span>
                  <span className="text-stone-500">pitches@mumbaidiaries.in</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800 block">Bureau Office</span>
                  <span className="text-stone-500">Kala Ghoda Arts Precinct, Fort, Mumbai 400001</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50/70 border border-amber-200/70 rounded-xl">
              <p className="text-[11px] text-amber-900 leading-relaxed font-serif italic">
                “Every corner of Bombay has a voice waiting for an ear to listen.”
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  Message Dispatched!
                </h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Mumbai Diaries. Our editorial team reviews every note and will get back to your inbox shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-[#C2410C] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Aarti Mehta"
                    className="w-full px-4 py-2.5 bg-stone-50/60 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#C2410C] focus:bg-white transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. aarti@example.com"
                    className="w-full px-4 py-2.5 bg-stone-50/60 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#C2410C] focus:bg-white transition-all"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Story Pitch / Secret Sunset Vantage Point"
                    className="w-full px-4 py-2.5 bg-stone-50/60 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#C2410C] focus:bg-white transition-all"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your thoughts, recommendations, feedback, or pitch..."
                    className="w-full px-4 py-2.5 bg-stone-50/60 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#C2410C] focus:bg-white transition-all resize-y"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-stone-900 hover:bg-[#C2410C] text-white text-xs font-semibold tracking-wide uppercase rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {loading ? (
                    <span>Dispatching...</span>
                  ) : (
                    <>
                      <span>Send to Editors</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
