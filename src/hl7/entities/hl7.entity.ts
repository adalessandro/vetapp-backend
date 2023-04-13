import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HL7Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  patientName: string;
  @Column({ nullable: true })
  patientSex: string;
  @Column({ nullable: true })
  patientAlias: string;
  @Column({ nullable: true })
  patientRace: string;

  @Column({ type: 'timestamp', nullable: true })
  observationDate: Date;
  @Column({ nullable: true })
  observationCollector: string;

  @Column({ nullable: true })
  resultAge: number;

  @Column({ nullable: true })
  wbcValue: string;
  @Column({ nullable: true })
  wbcUnit: string;
  @Column({ nullable: true })
  wbcRange: string;

  @Column({ nullable: true })
  lymPValue: string;
  @Column({ nullable: true })
  lymPUnit: string;
  @Column({ nullable: true })
  lymPRange: string;

  @Column({ nullable: true })
  granPValue: string;
  @Column({ nullable: true })
  granPUnit: string;
  @Column({ nullable: true })
  granPRange: string;

  @Column({ nullable: true })
  midPValue: string;
  @Column({ nullable: true })
  midPUnit: string;
  @Column({ nullable: true })
  midPRange: string;

  @Column({ nullable: true })
  lymNValue: string;
  @Column({ nullable: true })
  lymNUnit: string;
  @Column({ nullable: true })
  lymNRange: string;

  @Column({ nullable: true })
  granNValue: string;
  @Column({ nullable: true })
  granNUnit: string;
  @Column({ nullable: true })
  granNRange: string;

  @Column({ nullable: true })
  midNValue: string;
  @Column({ nullable: true })
  midNUnit: string;
  @Column({ nullable: true })
  midNRange: string;

  @Column({ nullable: true })
  rbcValue: string;
  @Column({ nullable: true })
  rbcUnit: string;
  @Column({ nullable: true })
  rbcRange: string;

  @Column({ nullable: true })
  hgbValue: string;
  @Column({ nullable: true })
  hgbUnit: string;
  @Column({ nullable: true })
  hgbRange: string;

  @Column({ nullable: true })
  hctValue: string;
  @Column({ nullable: true })
  hctUnit: string;
  @Column({ nullable: true })
  hctRange: string;

  @Column({ nullable: true })
  mcvValue: string;
  @Column({ nullable: true })
  mcvUnit: string;
  @Column({ nullable: true })
  mcvRange: string;

  @Column({ nullable: true })
  mchValue: string;
  @Column({ nullable: true })
  mchUnit: string;
  @Column({ nullable: true })
  mchRange: string;

  @Column({ nullable: true })
  mchcValue: string;
  @Column({ nullable: true })
  mchcUnit: string;
  @Column({ nullable: true })
  mchcRange: string;

  @Column({ nullable: true })
  rdwcvValue: string;
  @Column({ nullable: true })
  rdwcvUnit: string;
  @Column({ nullable: true })
  rdwcvRange: string;

  @Column({ nullable: true })
  rdwsdValue: string;
  @Column({ nullable: true })
  rdwsdUnit: string;
  @Column({ nullable: true })
  rdwsdRange: string;

  @Column({ nullable: true })
  pltValue: string;
  @Column({ nullable: true })
  pltUnit: string;
  @Column({ nullable: true })
  pltRange: string;

  @Column({ nullable: true })
  mpvValue: string;
  @Column({ nullable: true })
  mpvUnit: string;
  @Column({ nullable: true })
  mpvRange: string;

  @Column({ nullable: true })
  pdwValue: string;
  @Column({ nullable: true })
  pdwUnit: string;
  @Column({ nullable: true })
  pdwRange: string;

  @Column({ nullable: true })
  pctValue: string;
  @Column({ nullable: true })
  pctUnit: string;
  @Column({ nullable: true })
  pctRange: string;
}

@Entity()
export class HL7Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'text' })
  payload: string;
}

export function hl7EntryValues(hl7Entry): Record<string, string> {
  const ret = {
    fecha: new Date(hl7Entry.observationDate).toLocaleString(),
    paciente: hl7Entry.patientAlias,
    sexo: hl7Entry.patientSex,
    edad: hl7Entry.resultAge,
    especie: hl7Entry.patientRace,
    responsable: hl7Entry.patientName,
    solicita: hl7Entry.observationCollector,
    WBC: hl7Entry.wbcValue,
    'LYM%': hl7Entry.lymPValue,
    'GRAN%': hl7Entry.granPValue,
    'MID%': hl7Entry.midPValue,
    'LYM#': hl7Entry.lymNValue,
    'GRAN#': hl7Entry.granNValue,
    'MID#': hl7Entry.midNValue,
    RBC: hl7Entry.rbcValue,
    HGB: hl7Entry.hgbValue,
    HCT: hl7Entry.hctValue,
    MCV: hl7Entry.mcvValue,
    MCH: hl7Entry.mchValue,
    MCHC: hl7Entry.mchcValue,
    RDWCV: hl7Entry.rdwcvValue,
    RDWSD: hl7Entry.rdwsdValue,
    PLT: hl7Entry.pltValue,
    MPV: hl7Entry.mpvValue,
    PDW: hl7Entry.pdwValue,
    PCT: hl7Entry.pctValue,
  };
  for (const [k, v] of Object.entries(ret)) {
    ret[k] = String(v).replace(',', '.');
  }
  return ret;
}
