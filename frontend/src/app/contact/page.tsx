import Header from '../../components/Header';
import ContactForm from '../../components/ContactForm';
import SubHeader from '../../components/SubHeader';
import Footer from '../../components/Footer';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ContactForm />
        <Footer />
      </main>
    </div>
  );
}