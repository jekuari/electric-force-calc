import { useState, type ReactElement, useEffect } from "react";
import { Charge, ChargeField } from "../../Components/ChargeField/ChargeField";
import PreRegisterButton from "../../Components/Button/PreRegisterButton";
import { InRelationTo, Vector, adjustChargeToUnits, calculateResultingForce } from "../../Functions/calculate";
import SimplifiedInputSelect from "../../Components/Forms/SimplifiedInput/SimplifiedInputSelect/SimplifiedInputSelect";

export interface AppProps {}

export default function App(props: AppProps): ReactElement {
  const [charge1, setCharge1] = useState<Charge>({
    value: 0,
    coords: { x: 0, y: 0 },
    unit: "",
  });

  const [charge2, setCharge2] = useState<Charge>({
    value: 0,
    coords: { x: 0, y: 0 },
    unit: "",
  });

  const [charge3, setCharge3] = useState<Charge>({
    value: 0,
    coords: { x: 0, y: 0 },
    unit: "",
  });

  const [inRelationTo, setInRelationTo] = useState<InRelationTo>("charge1")

  const [result, setResult] = useState<Vector | null>()

  const handleCalculate = () => {
    const res = calculateResultingForce(charge1, charge2, charge3, inRelationTo)
    saveInputsToLocalStorage()
    setResult(res)
  }

  const saveInputsToLocalStorage = () => {
    localStorage.setItem("q1", JSON.stringify(charge1))
    localStorage.setItem("q2", JSON.stringify(charge2))
    localStorage.setItem("q3", JSON.stringify(charge3))
    localStorage.setItem("inRelationTo", inRelationTo)
  }

  useEffect(() => {
    const q1 = localStorage.getItem("q1")
    const q1Parsed = q1 && JSON.parse(q1)

    const q2 = localStorage.getItem("q2")
    const q2Parsed = q2 && JSON.parse(q2)

    const q3 = localStorage.getItem("q3")
    const q3Parsed = q3 && JSON.parse(q3)

    const inRelationTo = localStorage.getItem("inRelationTo")

    if (q1Parsed) {
      setCharge1(q1Parsed)
    }
    if (q2Parsed) {
      setCharge2(q2Parsed)
    }
    if (q3Parsed) {
      setCharge3(q3Parsed)
    }
    if (inRelationTo) {
      setInRelationTo(inRelationTo as InRelationTo)
    }
  }, [])
    


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">
      <div className="max-w-[800px] w-full p-4 bg-white rounded-lg shadow-lg flex flex-col gap-4">
        <h1 className="text-xl font-semibold text-center text-gray-900">
          Calculadora de Fuerza Resultante de 3 vectores
        </h1>
        <ChargeField
          setCharge={setCharge1}
          charge={charge1}
          key="asd"
          title="Carga 1"
        />
        <ChargeField
          setCharge={setCharge2}
          charge={charge2}
          key="dsa"
          title="Carga 2"
        />
        <ChargeField
          setCharge={setCharge3}
          charge={charge3}
          key="sda"
          title="Carga 3"
        />
        <SimplifiedInputSelect title="Calculate in relation to" setter={setInRelationTo} value={inRelationTo} options={["charge1", "charge2", "charge3"]} />
      </div>
      <PreRegisterButton onClick={handleCalculate}>
        <p>Calculate</p>
      </PreRegisterButton>
      {result && (
      <div className="max-w-[800px] w-full p-4 bg-white rounded-lg shadow-lg flex flex-col gap-4">
        <p><strong>m: </strong>{result?.magnitude}</p>
        <p><strong>a: </strong>{result?.angle}</p>
      </div>
      )}
    </div>
  );
}
