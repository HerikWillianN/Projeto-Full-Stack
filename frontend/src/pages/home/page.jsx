import styles from './page.module.css'
import RoupaFrio from '../../../public/imgs/homepage/roupaFrio'

export default function Home() {
    return (
        <div className={styles.pageContainer}>
            <section>
                <h1>Bem Vindo ao Ret House Brechó.</h1>
                <p>
                    No Ret House Brechó, acreditamos que moda e sustentabilidade andam juntas.
                    Aqui, você encontra peças únicas, cheias de estilo, por um preço
                    que cabe no seu bolso. De roupas e acessórios vintage a itens modernos em
                    ótimo estado, nosso brechó é um verdadeiro tesouro para quem ama looks
                    exclusivos e consumo consciente.
                </p>
            </section>

            <section>
                <img src="" alt="" />
                <div>
                    <i><RoupaFrio /></i>
                    <h4>Excelência no dia a dia</h4>
                    <p> Descubra nossa seleção diária de peças exclusivas para adicionar
                        um toque único e cheio de estilo ao seu look</p>
                </div>
            </section>
        </div>
    )
}