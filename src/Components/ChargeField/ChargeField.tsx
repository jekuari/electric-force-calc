import SimplifiedInput from "../Forms/SimplifiedInput/SimplifiedInputField/SimplifiedInput";
import SimplifiedInputSelect from "../Forms/SimplifiedInput/SimplifiedInputSelect/SimplifiedInputSelect";

export type Charge = {
  value: number;
  coords: { x: number; y: number };
  unit: string;
};

const unitMeasures = [
  "picocoulombs",
  "nanocoulombs",
  "microcoulombs",
  "millicoulombs",
  "coulombs",
  "kilocoulombs",
  "megacoulombs",
];

export const ChargeField = ({
  charge,
  setCharge,
  title,
}: {
  charge: Charge;
  setCharge: React.Dispatch<React.SetStateAction<Charge>>;
  title: string;
}) => {
  const handleCarga1CoordXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharge((prev) => ({
      ...prev,
      coords: { ...prev.coords, x: parseFloat(e.target.value) },
    }));
  };

  const handleCarga1CoordYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharge((prev) => ({
      ...prev,
      coords: { ...prev.coords, y: parseFloat(e.target.value) },
    }));
  };

  return (
    <div className="flex flex-row gap-4">
      <SimplifiedInput
        inputFieldProps={{
          onChange: (val) => {
            setCharge((prev) => ({
              ...prev,
              value: val.target.valueAsNumber,
            }));
          },
          value: charge.value,
          id: title,
          placeholder: title,
          type: "number",
        }}
        title={title}
      />
      <SimplifiedInputSelect
        placeholder="units"
        setter={(unit: string) => {
          setCharge((prev) => ({
            ...prev,
            unit,
          }));
        }}
        value={charge.unit}
        title="Select the units"
        options={unitMeasures}
      />
      <div className="flex gap-4">
        <SimplifiedInput
          inputFieldProps={{
            onChange: handleCarga1CoordXChange,
            value: charge.coords.x,
            id: "x",
            placeholder: "x",
            type: "number",
          }}
          title="X"
        />
        <SimplifiedInput
          inputFieldProps={{
            onChange: handleCarga1CoordYChange,
            value: charge.coords.y,
            id: "y",
            placeholder: "y",
            type: "number",
          }}
          title="Y"
        />
      </div>
    </div>
  );
};
