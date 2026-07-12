import SectionPanel from '@/components/SectionPanel';
import ContactForm from '@/components/ContactForm';
import CinematicFooter from '@/components/CinematicFooter';

export const metadata = {
  title: 'Contact | Swayam Awari',
  description: 'Open to freelance projects and full-time roles.',
};

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen bg-[#050505] pt-24 pb-12 px-4 md:px-8 overflow-hidden selection:bg-amber-500/20 selection:text-amber-500">
        <SectionPanel>
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#888] bg-[#111] px-4 py-2 rounded-full border border-white/5 mb-8 inline-block">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight leading-[1.1]">
              Let&apos;s work together.
            </h1>
            <p className="text-[#888] font-light leading-relaxed text-lg">
              Open to freelance projects and full-time roles.
            </p>
          </div>
          
          <ContactForm />
        </SectionPanel>
      </main>
      <CinematicFooter />
    </>
  );
}
