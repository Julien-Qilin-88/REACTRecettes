import { Divider } from 'primereact/divider';
import { Image } from 'primereact/image';

export default function Footer() {


    return (

        <div>
            <Divider type="solid" />
            <footer className="flex justify-content-center align-items-center">
                <Image src="/images/Logo_minimaliste.png" alt="logo" width="50" />
                <div className='ms-1'>
                    <p className="flex flex-column ">Julien PIERRAT-LABOLLE
                        <a href="https://www.julien-pierrat-labolle.fr/" target="_blank" rel="noreferrer"> Developpeur web</a>
                        <span>Des projets, des envies, des demandes specifique n'hésitez pas à me contacter : <a href="mailto:pierratlabollejulien@gmail.com">Envoyer un e-mail</a> </span>
                    </p>
                </div>
            </footer>
        </div>

    )
}