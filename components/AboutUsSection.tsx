import Image from 'next/image';
import RotatingTextHero from './RotatingTextHero';

export default function AboutUsSection() {
    return (
        <section className="my-16 bg-[#6e0081] px-6 py-12 text-white shadow-sm sm:py-16">
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
                        Tietoa meistä
                    </h2>

                    <p className="mt-4 text-white/90">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
                </div>
            </div>
        </section>
    );
}
