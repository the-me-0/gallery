import { Navbar } from '@/lib/components/Navbar';
import { ResourceCard } from '@/lib/components/ResourceCard';

export default function Home() {
  return (
    <main className='bg-base-300 h-full'>
      <Navbar />
      <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 p-4 h-64'>
        <ResourceCard src={'/resources/image1.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/image2.jpeg'} alt={''} type={'image'} title={'Redhead'} />
        <ResourceCard src={'/resources/image3.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/image4.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/image5.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/image6.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/image7.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/image4.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/image9.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/image10.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/image11.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/image1.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/image2.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/image3.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/image8.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
      </div>
    </main>
  );
}
