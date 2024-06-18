import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <section className="wrap">{children}</section>
      <Footer />
    </>
  )
}
