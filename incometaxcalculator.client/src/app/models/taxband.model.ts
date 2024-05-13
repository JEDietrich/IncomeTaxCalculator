// taxband.model.ts

export interface TaxBand {
  id: number;
  name: string;
  lowerLimit: number;
  upperLimit: number | null;
  taxRate: number;
}
