export interface StateData {
  name: string;
  capital: string;
  lgas: string[];
}

export const NIGERIA_STATES: StateData[] = [
  { name: "Lagos", capital: "Ikeja", lgas: ["Ikeja", "Lagos Island", "Eti-Osa", "Alimosho", "Ikorodu"] },
  { name: "Abuja (FCT)", capital: "Garki", lgas: ["Abuja Municipal", "Gwagwalada", "Kuje", "Bwari", "Kwali"] },
  { name: "Rivers", capital: "Port Harcourt", lgas: ["Port Harcourt", "Obio-Akpor", "Ikwerre", "Eleme", "Oyigbo"] },
  { name: "Oyo", capital: "Ibadan", lgas: ["Ibadan North", "Ibadan South-West", "Ogbomosho", "Iseyin"] },
  { name: "Kano", capital: "Kano", lgas: ["Kano Municipal", "Dala", "Fagge", "Gwale", "Tarauni"] },
  // ... adding more states as per general requirement, simplified for brevity here
  { name: "Anambra", capital: "Awka", lgas: ["Onitsha North", "Onitsha South", "Awka South", "Nnewi North"] },
  { name: "Delta", capital: "Asaba", lgas: ["Warri South", "Oshimili North", "Uvwie", "Sapele"] },
  { name: "Edo", capital: "Benin City", lgas: ["Oredo", "Ikpoba-Okha", "Egor", "Esan North-East"] },
  { name: "Kaduna", capital: "Kaduna", lgas: ["Kaduna North", "Kaduna South", "Chikun", "Zaria"] },
  { name: "Ogun", capital: "Abeokuta", lgas: ["Abeokuta North", "Abeokuta South", "Ijebu-Ode", "Obafemi Owode"] }
];
