import Header from '../components/Header';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ContactForm />
      </main>
    </div>
  );
}