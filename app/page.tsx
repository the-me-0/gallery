import { Navbar } from '@/lib/components/navbar';
import { ResourceCard } from '@/lib/components/ResourceCard';

export default function Home() {
  return (
    <main className='bg-base-300 h-full'>
      <Navbar />
      <div className='grid grid-cols-6 gap-4 p-4 h-64'>
        <ResourceCard src={'/resources/lewd1.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/lewd2.jpeg'} alt={''} type={'image'} title={'Redhead'} />
        <ResourceCard src={'/resources/lewd3.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/lewd4.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/lewd5.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/lewd6.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/lewd7.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/lewd4.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/lewd9.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/lewd10.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/lewd11.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/lewd1.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/lewd2.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/lewd3.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
        <ResourceCard src={'/resources/lewd8.jpeg'} alt={''} type={'image'} title={'Redhead redhead redhead redhead'} />
      </div>
    </main>
  );
}
