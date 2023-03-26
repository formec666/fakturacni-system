import Head from "next/head";
import prisma from "../../lib/prisma";

export default function Print(props:{faktura:any}){
    return <>
    <Head>
        <title>Automatický fakturační systém vytvořil Tomáš Formánek, GitHub @formec666</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col b">
        <div className="text-center font-semibold text-2xl">Faktura-daňový doklad</div>
        <div className="flex flex-row justify-start m-2">
            <div>
                <div>
                    Číslo faktury:
                </div>
                <div>
                    Konstantní symbol:
                </div>
                <div>
                    Datum vystavení:
                </div>
                <div>
                    Datum splatnosti:
                </div>
                <div>
                    Způsob platby:
                </div>
            </div>
            <div className="mx-2">
                <div>
                    {props.faktura.id}
                </div>
                <div>
                    {`0308${props.faktura.id}`}
                </div>
                <div>
                    {props.faktura.vystaveno}
                </div>
                <div>
                    {props.faktura.vystaveno}
                </div>
                <div>
                    převodem
                </div>
            </div>
        </div>
        <div className="m-2 font-semibold text-lg border-t-2 border-stone-600 rounded-none">
        Dodavatel: 
            <div className="text-base">Karel Mazal Montáž a oprava vyhrazených elektrických zařízení, montáž a opravy plynových spotřebičů do 50kW
                <div className="font-normal italic"> ŽL vydal: Okresní úřad Vyškov, pod č.j. Ž/3578/01Or, ev.č. 371200-2370-01 IČO: 40478-386, nejsem plátce DPH
                </div>
            </div>
            <div className="flex flex-row font-normal text-base pt-6 justify-between ">
                <div>
                    <div>IČ: 40478-386</div>
                    <div>Ant. Zápotockého 17</div>
                    <div>68203 Vyškov</div>
                    <div>Mobil: 603 339 538</div>
                </div>
                <div>
                    <div>
                        Bankovní spojení : ČSSP Vyškov
                    </div>
                    <div>
                        Číslo účtu: 1560047389/0800
                    </div>
                </div>
            </div>
        </div>
        <div className="m-2 font-semibold text-lg border-t-2 border-stone-600 rounded-none">
            Odběratel
            <div className="mx-2 font-normal text-base">{props.faktura.jmeno}</div>
            <div className="mx-2 font-normal text-base">{props.faktura.adresa}</div>
            <div className="mx-2 font-normal text-base">{`${props.faktura.psc} ${props.faktura.mesto}`}</div>

        </div>
        <div className="m-2 font-semibold text-lg border-t-2 border-stone-600 rounded-none">
            Označení dodávky a cena
            <div className=" font-normal text-base" dangerouslySetInnerHTML={{__html: props.faktura.popis}}>
                {/*props.faktura.popis*/}
            </div>
            <div className="mt-6 flex flex-row justify-between border-b-2 border-stone-600">
                <div>
                    <div>
                        Cena Celkem
                    </div>
                </div>
                <div>
                    <div>
                        {props.faktura.cena},-Kč
                    </div>
                </div>
            </div>
            <div className="italic font-normal text-sm">
                Nejsem plátce DPH
            </div>
        </div>
        <div className="m-4">
            Razítko a podpis:
        </div>

      </div>
    </>
}

export async function getServerSideProps(context:any){
    const faktura = await prisma.faktura.findUnique({
        where:{
            id: parseInt(context.params.fid)
        }
    })
    return {
        props:{
            faktura: {...faktura, 
                vystaveno: `${faktura?.vystaveno?.getDate()}. ${faktura?.vystaveno?.getMonth()}. ${faktura?.vystaveno?.getFullYear()}`,
                vytvoreno: `${faktura?.vytvoreno?.getDate()}. ${faktura?.vytvoreno?.getMonth()}. ${faktura?.vytvoreno?.getFullYear()}`,
                splatnost: `${faktura?.splatnost?.getDate()}. ${faktura?.splatnost?.getMonth()}. ${faktura?.splatnost?.getFullYear()}`,
                popis: faktura?.popis?.replaceAll('\n', '<br>')
            }
        }
    }
}