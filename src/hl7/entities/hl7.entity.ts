import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPostgresInterval } from 'postgres-interval';
import { intervalDateToString } from 'src/common/lib/helpers';

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

  @Column({ type: 'interval', nullable: true })
  resultAge: IPostgresInterval;

  @Column({ type: 'float', nullable: true })
  wbcValue: number;
  @Column({ nullable: true })
  wbcUnit: string;
  @Column({ nullable: true })
  wbcRange: string;

  @Column({ type: 'float', nullable: true })
  lymPValue: number;
  @Column({ nullable: true })
  lymPUnit: string;
  @Column({ nullable: true })
  lymPRange: string;

  @Column({ type: 'float', nullable: true })
  granPValue: number;
  @Column({ nullable: true })
  granPUnit: string;
  @Column({ nullable: true })
  granPRange: string;

  @Column({ type: 'float', nullable: true })
  midPValue: number;
  @Column({ nullable: true })
  midPUnit: string;
  @Column({ nullable: true })
  midPRange: string;

  @Column({ type: 'float', nullable: true })
  lymNValue: number;
  @Column({ nullable: true })
  lymNUnit: string;
  @Column({ nullable: true })
  lymNRange: string;

  @Column({ type: 'float', nullable: true })
  granNValue: number;
  @Column({ nullable: true })
  granNUnit: string;
  @Column({ nullable: true })
  granNRange: string;

  @Column({ type: 'float', nullable: true })
  midNValue: number;
  @Column({ nullable: true })
  midNUnit: string;
  @Column({ nullable: true })
  midNRange: string;

  @Column({ type: 'float', nullable: true })
  rbcValue: number;
  @Column({ nullable: true })
  rbcUnit: string;
  @Column({ nullable: true })
  rbcRange: string;

  @Column({ type: 'float', nullable: true })
  hgbValue: number;
  @Column({ nullable: true })
  hgbUnit: string;
  @Column({ nullable: true })
  hgbRange: string;

  @Column({ type: 'float', nullable: true })
  hctValue: number;
  @Column({ nullable: true })
  hctUnit: string;
  @Column({ nullable: true })
  hctRange: string;

  @Column({ type: 'float', nullable: true })
  mcvValue: number;
  @Column({ nullable: true })
  mcvUnit: string;
  @Column({ nullable: true })
  mcvRange: string;

  @Column({ type: 'float', nullable: true })
  mchValue: number;
  @Column({ nullable: true })
  mchUnit: string;
  @Column({ nullable: true })
  mchRange: string;

  @Column({ type: 'float', nullable: true })
  mchcValue: number;
  @Column({ nullable: true })
  mchcUnit: string;
  @Column({ nullable: true })
  mchcRange: string;

  @Column({ type: 'float', nullable: true })
  rdwcvValue: number;
  @Column({ nullable: true })
  rdwcvUnit: string;
  @Column({ nullable: true })
  rdwcvRange: string;

  @Column({ type: 'float', nullable: true })
  rdwsdValue: number;
  @Column({ nullable: true })
  rdwsdUnit: string;
  @Column({ nullable: true })
  rdwsdRange: string;

  @Column({ type: 'float', nullable: true })
  pltValue: number;
  @Column({ nullable: true })
  pltUnit: string;
  @Column({ nullable: true })
  pltRange: string;

  @Column({ type: 'float', nullable: true })
  mpvValue: number;
  @Column({ nullable: true })
  mpvUnit: string;
  @Column({ nullable: true })
  mpvRange: string;

  @Column({ type: 'float', nullable: true })
  pdwValue: number;
  @Column({ nullable: true })
  pdwUnit: string;
  @Column({ nullable: true })
  pdwRange: string;

  @Column({ type: 'float', nullable: true })
  pctValue: number;
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

export function hl7EntryValues(hl7Entry): Record<string, number | string> {
  const ret = {
    fecha: new Date(hl7Entry.observationDate).toLocaleDateString(),
    paciente: hl7Entry.patientAlias,
    sexo: hl7Entry.patientSex,
    edad: intervalDateToString(hl7Entry.resultAge),
    especie: hl7Entry.patientRace,
    responsable: hl7Entry.patientName,
    solicita: hl7Entry.observationCollector,
    WBC: hl7Entry.wbcValue * 1000,
    'LYM%': hl7Entry.lymPValue,
    'GRAN%': hl7Entry.granPValue,
    'MID%': hl7Entry.midPValue,
    'LYM#': hl7Entry.lymNValue,
    'GRAN#': hl7Entry.granNValue,
    'MID#': hl7Entry.midNValue,
    RBC: hl7Entry.rbcValue * 1000000,
    HGB: hl7Entry.hgbValue,
    HCT: hl7Entry.hctValue,
    MCV: hl7Entry.mcvValue,
    MCH: hl7Entry.mchValue,
    MCHC: hl7Entry.mchcValue,
    RDWCV: hl7Entry.rdwcvValue,
    RDWSD: hl7Entry.rdwsdValue,
    PLT: hl7Entry.pltValue * 1000,
    MPV: hl7Entry.mpvValue,
    PDW: hl7Entry.pdwValue,
    PCT: hl7Entry.pctValue,
  };
  return ret;
}
