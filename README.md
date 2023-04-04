# Fakturační systém

20 let jsme psali faktury kopírováním té samé stránky ve wordu, ale word mě nas*al, neumí zálohování ani nic takže to vždykcy bylo k ničemu. Je pravda že mám v ruce kladivo (next) takže vidím všude hřebíky (něco co by nutně potřebovalo webovou aplikaci xd) ale není kdo by mě zastavil, takže se s vámi o to rád podělím. Snažil jsem se vybrat barvy a tak aby to zvládl ovládat i můj postarší děda, takže to určitě zvládnete taky nebo si to upravte, má to tailwind takže ezpz.

## Použijte taky!

Naklonujte z githubu

Nakonfigurujte DB v .env a schema.prisma

```bash
npm install
```

```bash
npx prisma db push
```

Změňte vlastní data v /pages/print/[fid].tsx
a přejmenujte si stránku /pages/faktury/[fid].tsx v Head

```bash
npm run dev
```
nebo 
```bash
next build
```

nastavte apache nebo nginx


## Jak používat

Vlevo je výpis faktur a možnost vytvořit novou. Vpravo je formulář pro data ve faktuře, včetně text area a popis. Text area zpracuje i nové řádky tekže není problém si rozepsat seznam nebo něco, jen pozor na délku, když to bude moc řádků tak se to možná nevejde na stránku nebo tak něco.

Tlačítkem uložit uložíte (kdo by to byl řekl že) a vystavit vystaví fakturu, tzn. do DB k ní napíše datum vystavení a nejde ji dál ukládat. Teda jde ale není tam na to tlačítko hehe.

Po vystavení se zobrazuje pouze možnost tisk, to nás vezme na stránku kde se zobrazuje finální verze faktury, jenom trochu roztáhlá do šířky, když dáte tisknout z prohlížeče CTR + P tak vám vyjede utilitka na tisk, tam už je všechno dobře.


