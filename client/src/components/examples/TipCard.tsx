import TipCard from '../TipCard'
import { Wrench } from 'lucide-react'

export default function TipCardExample() {
  return (
    <TipCard
      icon={Wrench}
      title="Manutenção Preventiva"
      description="Aprenda as melhores práticas para manter sua impressora funcionando perfeitamente por mais tempo."
      href="/dicas/manutencao-preventiva"
    />
  )
}
