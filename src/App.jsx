import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Card from './components/InfiniteList/Card'

function App() {

  return (
    <>
      <div>
        <Header />
        <div className='flex flex-col justify-center items-center'>
          {/* <div>
          <h1 className='text-4xl font-bold '>Hello Ji This is Saini</h1>
          </div> */}
          <Card />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
