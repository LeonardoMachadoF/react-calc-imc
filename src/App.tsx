import { useState } from 'react'
import styles from './App.module.css'
import poweredImage from './assets/powered.png'
import { levels, calculateImc, Level } from './helpers/imc'
import { GridItem } from './components/Griditem/index'
import leftArrowImage from './assets/leftarrow.png'

function App() {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, SetToShow] = useState<Level | null>(null);

  const handleBackButton = () => {
    SetToShow(null);
    setHeightField(0);
    setWeightField(0);
  }
  const handleCalculateButton = () => {
    if (heightField && weightField) {
      SetToShow(calculateImc(heightField, weightField))
    } else {
      alert('Digite todos os Campos')
    }
  }


  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftside}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input type="number" disabled={toShow ? true : false} value={heightField > 0 ? heightField : ''} onChange={e => setHeightField(parseFloat(e.target.value))} placeholder='Digite sua altura em metros (ex: 1,7)' />
          <input type="number" disabled={toShow ? true : false} value={weightField > 0 ? weightField : ''} onChange={e => setWeightField(parseFloat(e.target.value))} placeholder='Digite seu peso em KG. (ex: 70kg;)' />

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>

        <div className={styles.rightside}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          }{toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App
