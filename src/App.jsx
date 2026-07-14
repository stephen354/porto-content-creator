import Header from './components/Header'
import BentoGrid from './components/BentoGrid'
import BrandsSection from './components/BrandsSection'
import CtaRow from './components/CtaRow'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
        <BentoGrid />
        <BrandsSection />
        <CtaRow />
        <Footer />
      </main>
    </>
  )
}

export default App
