export type Charge = {
  value: number;
  coords: { x: number; y: number };
  unit: string;
};

export type Vector = {
  magnitude: number;
  angle: number;
};

export type InRelationTo = "charge1" | "charge2" | "charge3";

export const calculateResultingForce = (
  charge1: Charge,
  charge2: Charge,
  charge3: Charge,
  inRelationTo: InRelationTo,
): Vector => {
  const charges = [charge1, charge2, charge3];
  let index = 0;
  let index1 = 0;
  let index2 = 0;
  switch (inRelationTo) {
    case "charge1":
      index = 0;
      index1 = 1;
      index2 = 2;
      break;
    case "charge2":
      index = 1;
      index1 = 0;
      index2 = 2;
      break;
    case "charge3":
      index = 2;
      index1 = 0;
      index2 = 1;
      break;
  }
  let q1 = charges[index];
  let q2 = charges[index1];
  let q3 = charges[index2];

  q1 = { ...q1, value: adjustToUnits(q1) };
  q2 = { ...q2, value: adjustToUnits(q2) };
  q3 = { ...q3, value: adjustToUnits(q3) };

  const distanceq1q2 = calculateDistance(q1, q2);

  const distanceq1q3 = calculateDistance(q1, q3);

  const forceq1q2 = calculateForce(q1.value, q2.value, distanceq1q2);

  const forceq1q3 = calculateForce(q1.value, q3.value, distanceq1q3);

  const angleq1q2 = calculateAngle(q2, q1);

  const angleq1q3 = calculateAngle(q1, q3);

  const forceXq1q2 = forceq1q2 * Math.cos(angleq1q2);

  const forceYq1q2 = forceq1q2 * Math.sin(angleq1q2);

  const forceXq1q3 = forceq1q3 * Math.cos(angleq1q3);

  const forceYq1q3 = forceq1q3 * Math.sin(angleq1q3);

  const forceX = forceXq1q2 + forceXq1q3;
  const forceY = forceYq1q2 + forceYq1q3;

  const R = Math.sqrt(forceX ** 2 + forceY ** 2);
  const angle = Math.abs(rad2deg(Math.atan(forceY / forceX)));

  return { magnitude: R, angle };
};

const rad2deg = (rad: number): number => {
  return (rad * 180) / Math.PI;
};

const calculateDistance = (q1: Charge, q2: Charge): number => {
  const distanceX = q1.coords.x - q2.coords.x;
  const distanceY = q1.coords.y - q2.coords.y;

  return Math.sqrt(distanceX ** 2 + distanceY ** 2);
};

const calculateForce = (q1: number, q2: number, r: number): number => {
  const K = 8.99e9;
  return Math.abs(K * ((q1 * q2) / r ** 2));
};

const calculateAngle = (q1: Charge, q2: Charge): number => {
  return Math.atan2(q2.coords.y - q1.coords.y, q2.coords.x - q1.coords.x);
};

const adjustToUnits = (q: Charge): number => {
  switch (q.unit) {
    case "picocoulombs":
      return q.value * 1e-12;
    case "nanocoulombs":
      return q.value * 1e-9;
    case "microcoulombs":
      return q.value * 1e-6;
    case "millicoulombs":
      return q.value * 1e-3;
    case "coulombs":
      return q.value;
    case "kilocoulombs":
      return q.value * 1e3;
    case "megacoulombs":
      return q.value * 1e6;
    case "gigacoulombs":
      return q.value * 1e9;
    default:
      return q.value;
  }
};
