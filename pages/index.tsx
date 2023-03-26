import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import prisma from '../lib/prisma'
import { Input } from '../components/input'

export default function Home (props:{faktury:any}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-row  justify-left px-20 text-center">
        <div className='flex flex-col b-2 h-full items-start'>
          {props.faktury.map((faktura:any)=>(
            <div>{faktura.jmeno}</div>
          ))}
        </div>
        <div className='flex flex-col h-full w-full '>
            <Input label='Jméno' />
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps({locale}: GetStaticPropsContext) {
  // If you don't use internationalized routing, define this statically.
  const faktury = await prisma.faktura.findMany();
  //console.log(faktury);
  return {
    redirect:{
      destination: '/faktury/1'
    },
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by language.
      
      faktury: JSON.parse(JSON.stringify(faktury))
    }
  };
}
