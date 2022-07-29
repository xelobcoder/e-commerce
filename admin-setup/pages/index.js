import Head from 'next/head'
import Sidebar from '../components/sidebar'

export default function Home() {
  return (
    <div className=''>
      
    </div>
  )
}


Home.getPageLayout = (page) => {
  return (
    <>
     <div>
        <Sidebar/>
        {page}
     </div>
    </>
  )
}