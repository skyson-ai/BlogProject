import BlogHeroSection from '../../components/BlogHeroSection'
import Header from '../../components/Header'
import BlogSection from '../../components/BlogSection'
import ContactForm from '../../components/ContactForm'
import Footer from '../../components/Footer'

const page = () => {
  return (
    <div>
      <Header />
      <BlogHeroSection />
      <ContactForm />
      <BlogSection />
      <Footer />
    </div>
  )
}

export default page