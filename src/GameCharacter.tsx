import { useState } from 'react'
import { giveMeAnAvatar } from 'give-me-an-avatar'
import style from './GameCharacter.module.css'
import { numberOfWeakCharacters } from './utils/weak-character'

const NUMBER_BASE = 300
const CHAR_COUNT = 40

interface CharacterCard {
  defense: number
  attack: number
  weak?: boolean
  avatar: string
}
interface CharacterCardProps {
  character: CharacterCard
  isWeak: boolean
}

function GameCharacrerPage() {
  const [characters, setCharacters] = useState<CharacterCard[]>([])
  const [weakIndice, setWeakIndice] = useState<number[]>([])
  return (
    <div>
      <h1>Game Character cards</h1>
      <p>
        <button onClick={() => shuffle()}>Shuffle!!</button>
      </p>
      <section className={style.cardContainer}>
        {characters.map((character, i) => (
          <Card key={i} isWeak={weakIndice.indexOf(i) > -1} character={character} />
        ))}
      </section>
    </div>
  )

  function shuffle() {
    const cards: CharacterCard[] = []
    for (let i = 0; i < CHAR_COUNT; i++) {
      cards.push({
        defense: Math.ceil(Math.random() * NUMBER_BASE),
        attack: Math.ceil(Math.random() * NUMBER_BASE),
        avatar: giveMeAnAvatar({
          Size: 300,
        }),
      })
    }
    const weakIndice = numberOfWeakCharacters(
      cards.map((c) => [c.attack, c.defense])
    )
    setWeakIndice(weakIndice)
    setCharacters(cards)
  }
}

function Card({
  isWeak,
  character: { avatar, defense, attack },
}: CharacterCardProps) {
  return (
    <div className={style.card} data-is-weak={isWeak}>
      <figure>
        <img src={avatar} aria-hidden="true" alt="avatar" />
      </figure>
      <dl>
        <dt>defense</dt>
        <dd>{defense}</dd>
        <dt>attack</dt>
        <dd>{attack}</dd>
      </dl>
    </div>
  )
}

export default GameCharacrerPage
