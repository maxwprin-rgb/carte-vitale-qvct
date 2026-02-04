// src/app/page.tsx - Landing Page QVCT Wrapped

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#5B6EF7] rounded-full opacity-10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4ECDC4] rounded-full opacity-10 blur-3xl animate-float delay-500" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#FF6B6B] rounded-full opacity-5 blur-3xl animate-float delay-300" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-4 px-4 border-b border-[#5B6EF7]/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-[var(--color-dark)] tracking-tight">
              QVCT <span className="text-gradient">WRAPPED</span>
            </span>
          </div>
          <span className="text-xs text-[var(--color-text-muted)] font-medium">
            par <span className="text-[#5B6EF7] font-semibold">Ulteam</span>
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-[#5B6EF7]/20 shadow-sm mb-8 animate-fade-in-down">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ECDC4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ECDC4]"></span>
            </span>
            <span className="text-sm font-medium text-[var(--color-text)]">
              Edition 2026 disponible
            </span>
          </div>

          {/* Main title */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--color-dark)] leading-tight mb-6 animate-fade-in-up">
            Découvre ton profil
            <br />
            <span className="text-gradient">bien-être au travail</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-xl mx-auto mb-10 animate-fade-in-up delay-100">
            2 minutes pour savoir si ton travail te rend heureux.
            <br className="hidden md:block" />
            <span className="font-semibold text-[var(--color-text)]">Gratuit, anonyme et partageable.</span>
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up delay-200">
            <Link
              href="/quiz"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#5B6EF7] text-white font-display font-bold text-lg rounded-full shadow-lg shadow-[#5B6EF7]/30 hover:shadow-xl hover:shadow-[#5B6EF7]/40 hover:-translate-y-1 transition-all duration-300"
            >
              Commencer le quiz
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex flex-col items-center gap-3 animate-fade-in-up delay-300">
            {/* Avatars */}
            <div className="flex -space-x-3">
              {['#FF6B6B', '#5B6EF7', '#4ECDC4', '#FFA94D', '#9F7AEA'].map((color, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-3 border-white shadow-md flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: color }}
                >
                  {['A', 'S', 'M', 'L', 'C'][i]}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-3 border-white shadow-md bg-[var(--color-dark)] flex items-center justify-center text-white font-bold text-xs">
                +12k
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">
              <span className="font-bold text-[var(--color-text)]">12,847 salaries</span> ont deja fait le test
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-4 py-16 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="card-playful p-6 text-center animate-fade-in-up">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#5B6EF7] to-[#4ECDC4] flex items-center justify-center shadow-lg">
                <span className="text-2xl">&#9889;</span>
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--color-dark)] mb-2">
                2 min chrono
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                20 questions rapides pour un bilan complet de ta QVCT
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-playful p-6 text-center animate-fade-in-up delay-100">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FFA94D] flex items-center justify-center shadow-lg">
                <span className="text-2xl">&#128274;</span>
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--color-dark)] mb-2">
                100% anonyme
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Aucune donnee personnelle collectee. Juste toi et tes reponses
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-playful p-6 text-center animate-fade-in-up delay-200">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#4ECDC4] to-[#5B6EF7] flex items-center justify-center shadow-lg">
                <span className="text-2xl">&#128279;</span>
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--color-dark)] mb-2">
                Partageable
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Carte resultat optimisee pour LinkedIn. Challenge tes collegues !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-[var(--color-dark)] mb-12">
            Comment ca marche ?
          </h2>

          <div className="space-y-6 stagger-children">
            {[
              { step: '1', title: 'Reponds a 20 questions', desc: 'Sur ton equilibre vie pro/perso, ta charge mentale, tes relations...', color: '#5B6EF7' },
              { step: '2', title: 'Decouvre ton profil', desc: 'Phoenix, Equilibriste, Marathonien... Quel profil QVCT es-tu ?', color: '#FF6B6B' },
              { step: '3', title: 'Partage sur LinkedIn', desc: 'Compare avec tes collegues et sensibilise ton entreprise', color: '#4ECDC4' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 animate-fade-in-up">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-display font-bold text-xl shadow-lg"
                  style={{ backgroundColor: item.color }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[var(--color-dark)]">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-text-muted)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profiles preview */}
      <section className="relative z-10 px-4 py-16 bg-gradient-to-br from-[#5B6EF7]/5 to-[#4ECDC4]/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-dark)] mb-4">
            6 profils QVCT a decouvrir
          </h2>
          <p className="text-[var(--color-text-muted)] mb-10">
            Du Phoenix rayonnant au signal Alerte, decouvre ou tu te situes
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { emoji: '&#128293;', name: 'Phoenix', color: 'from-amber-400 to-red-500' },
              { emoji: '&#9878;&#65039;', name: 'Equilibriste', color: 'from-emerald-400 to-blue-500' },
              { emoji: '&#127939;', name: 'Marathonien', color: 'from-blue-400 to-indigo-500' },
              { emoji: '&#127914;', name: 'Funambule', color: 'from-orange-400 to-pink-500' },
              { emoji: '&#128735;', name: 'Survivant', color: 'from-gray-600 to-gray-900' },
              { emoji: '&#127384;', name: 'Alerte', color: 'from-red-500 to-red-700' },
            ].map((profile) => (
              <div
                key={profile.name}
                className="group relative px-5 py-3 rounded-2xl bg-white border-2 border-transparent hover:border-[#5B6EF7]/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                <span className="text-2xl mr-2" dangerouslySetInnerHTML={{ __html: profile.emoji }} />
                <span className="font-display font-semibold text-[var(--color-dark)]">{profile.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6 animate-bounce">&#127919;</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
            Pret a decouvrir ton score ?
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] mb-8">
            Rejoins les 12,000+ salaries qui ont deja fait le test
          </p>
          <Link
            href="/quiz"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-[#5B6EF7] text-white font-display font-bold text-xl rounded-full shadow-xl shadow-[#5B6EF7]/30 hover:shadow-2xl hover:shadow-[#5B6EF7]/40 hover:-translate-y-1 animate-pulse-glow transition-all duration-300"
          >
            C'est parti !
            <span className="group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300">
              &#128640;
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-[#5B6EF7]/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
          <p>
            © 2026 <span className="font-semibold text-[#5B6EF7]">Ulteam</span> • QVCT Wrapped Edition
          </p>
          <div className="flex items-center gap-4">
            <a href="https://carte-vitale.ulteam.eu" target="_blank" rel="noopener noreferrer" className="hover:text-[#5B6EF7] transition-colors">
              carte-vitale.ulteam.eu
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
