import { NIGERIA_STATES } from "@renthub/shared";

export const getLGAsForState = (stateName: string) => {
  const state = NIGERIA_STATES.find(s => s.name.toLowerCase() === stateName.toLowerCase());
  return state ? state.lgas : [];
};

export const isValidLGA = (stateName: string, lgaName: string) => {
  const lgas = getLGAsForState(stateName);
  return lgas.some(l => l.toLowerCase() === lgaName.toLowerCase());
};
