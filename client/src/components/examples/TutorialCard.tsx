import TutorialCard from '../TutorialCard'

export default function TutorialCardExample() {
  return (
    <TutorialCard
      title="Como Instalar Impressora HP DeskJet 2700"
      brand="HP"
      readTime="5 min"
      difficulty="Fácil"
      href="/tutorial/hp-deskjet-2700"
      isPopular={true}
    />
  )
}
