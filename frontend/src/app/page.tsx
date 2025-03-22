import Header from '../components/Header';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';
import SubHeader from '../components/SubHeader';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SubHeader />
      <main className="flex-grow">
        <Hero />
        <ContactForm />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}