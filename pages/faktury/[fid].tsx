import { PrismaClient, Prisma } from '@prisma/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Input } from '../../components/input'
import prisma from '../../lib/prisma'

export default function Home (props:{faktury:any, faktura:any}) {
  const router = useRouter();
    //console.log(props.faktura);

    const [faktura, setFaktura] = useState({...props.faktura, splatnost: new Date(props.faktura.splatnost).toISOString().slice(0,10)});
    const [loading, setLoading] = useState(false);
  return (

    <div className="flex h-screen flex-col items-center justify-center " key={router.asPath}>
      <Head>
        <title>Děda Faktury</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-row w-full justify-between p-4 bg-blue-400 items-center'>
        <div className='text-5xl text-white'>Faktury</div>
        <div></div>
      </div>

      <div className="flex w-full flex-1 flex-row h-5/6  justify-between relative text-center" >
        <div className='flex flex-col border-2   w-1/3 items-start p-2'>
            <Link className='bg-green-200 border-2 p-2 w-full text-lg hover:scale-105 transition-all duration:200 ease-out hover:border-black' href={'/faktury/new'}>Nová faktura</Link>
          {props.faktury.map((faktura:any)=>(
            <Link href={`/faktury/${faktura.id}`} className='bg-grey-200 border-2 p-2 w-full hover:scale-105 transition-all bg-blue-100 hover:border-black duration:200 ease-out bg-white'>{faktura.id}. {faktura.jmeno}</Link>
          ))}
          </div>
          <div className='flex-col  w-2/3  flex-1 overflow-y-auto p-2' key={faktura.id}>
            <Input label='Jméno a příjmení' value={faktura.jmeno} onChange={(e:string)=>setFaktura({...faktura, jmeno:e})} />
            <Input label='Ulice a číslo popisné' value={faktura.adresa} onChange={(e:string)=>setFaktura({...faktura, adresa:e})}/>
            <Input label='Město' value={faktura.mesto} onChange={(e:string)=>setFaktura({...faktura, mesto:e})}/>
            <Input label='PSČ ' value={faktura.psc} onChange={(e:string)=>setFaktura({...faktura, psc:e})}/>
            <Input label='Cena v Kč' value={faktura.cena} onChange={(e:string)=>setFaktura({...faktura, cena:e})} type='number'/>
            <Input label='Popis' value={faktura.popis} onChange={(e:string)=>setFaktura({...faktura, popis:e})} type='textarea'/>
            <Input label='Splatnost ' value={faktura.splatnost} onChange={(e:string)=>setFaktura({...faktura, splatnost:e})} props={{min: new Date().toISOString().slice(0,10)}} type='date'/>
            {faktura.vystaveno==null?
              <><div onClick={()=>saveFaktura(faktura, setLoading)} className='p-4 bg-blue-500 hover:cursor-pointer'>{loading?'Ukládám':'Uložit'}</div>
              <div onClick={()=>{
                
                saveFaktura({...faktura, vystaveno: true}, setLoading);
                router.reload();
              }}
                className='p-4 bg-blue-500 hover:cursor-pointer'>
                  {loading?'Vystavuji':'Vystavit'}
                </div>
              </>
              :<Link href={`/tisk/${faktura.id}`} className=' w-full p-4 bg-blue-500 hover:cursor-pointer'>
                Tisk
              </Link>}
          </div>
        
      </div>

      
    </div>
  )
}

export const saveFaktura = async (faktura:any, setLoading:any) => {
  setLoading(true)
  const response = await fetch("/api/save", {
    method: "POST",
    body: JSON.stringify(faktura)
  });
  const body = response.json();
  setLoading(false);
  console.log(faktura);
}

export async function getServerSideProps(context: any) {
  // If you don't use internationalized routing, define this statically.
  const faktury = await prisma.faktura.findMany();
  var faktura= {};
  if (context.params.fid != 'new') {
    faktura = await prisma.faktura.findUnique({
        where:{
            id: parseInt(context.params.fid)
        }
      })
    
  }
  else{
    
    const input = {cena: 0}
    faktura=await prisma.faktura.create({data: input
    });
    return {redirect:{
        destination: '/faktury/'+faktura.id
    }}
  }
  
  //console.log(faktury);
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by language.
      key: context.params.fid,
      faktury: JSON.parse(JSON.stringify(faktury)),
      faktura: JSON.parse(JSON.stringify(faktura))
    }
  };
}
