import Image from 'next/image';
import RotatingTextHero from './RotatingTextHero';
import RequestQuoteButton from './RequestQuoteButton';

export default function AboutUsSection() {
    return (
        <section className="my-16 bg-[#6e0081] px-6 py-16 pt-0 text-white shadow-sm sm:py-0">
            <div className="mx-auto max-w-7xl grid items-center gap-10 md:grid-cols-2">

                {/* Left: Responsive Logo */}
                <div className="flex items-center justify-center">
                    <div className="
          relative
          w-full
          aspect-square
          max-w-[70vw]
          sm:max-w-[50vw]
          md:max-w-[620px]
          mx-auto
        ">
                        <Image
                            src="/logo.png"
                            alt="Wizard Cow logo"
                            fill
                            className="object-contain drop-shadow-lg"
                            priority={false}
                        />
                    </div>
                </div>

                {/* Right: Heading + text */}
                <div className="px-1 sm:px-2">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Vähemmän säätöä, enemmän tuloksia
                    </h2>

                    <p className="mt-4 text-white/90">
                        Me kesytämme IT-ongelmat — oli kyseessä villi integraatio,
                        karkuteillä oleva automaatio tai ohjelmisto, joka käyttäytyy kuin äkäinen sonni.
                        Siistimme prosessit, sujuvoitamme arjen ja varmistamme, että yrityksesi voi
                        keskittyä kasvuun eikä jatkuvaan tulipalojen sammutukseen.
                    </p>

                    {/* RotatingTextHero at the end of the right column */}
                    <div className="mt-8">
                        <RotatingTextHero
                            variant="inline"
                            items={[
                                'muuttaa kahvin koodiksi',
                                'pitää hauskaa',
                                'innovoi, kun muut märehtii',
                                'luo arvoa',
                                'koodaa kuin näkymätön lehmä selän takana',
                                'reagoi nopeasti',
                                'optimoi prosesseja',
                                'kuuntelee asiakkaita',
                                'ylläpitää palveluita',
                                'ratkaisee haasteesi',
                                'rakentaa kauniita käyttöliittymiä',
                                'parantaa tehokkuutta',
                                'luo kilpailuetua',
                                'kesyttää bugit',
                            ]}
                        />
                    </div>
                    {/* Simple anchor variant – no extra imports or state needed */}
                    <div className="mt-8 flex gap-4">
                        <RequestQuoteButton />
                        <RequestQuoteButton label="Ota yhteyttä" mode="link"/>
                    </div>
                </div>
            </div>
        </section>
    );
}
