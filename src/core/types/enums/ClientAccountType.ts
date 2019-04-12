/** @format */

// The following table specifies all supported account client types.
export enum ClientAccountType {
  // Account held by an individual.

  Individual = 'Individual',
  // Account held jointly by several individuals (e.g., spouses).

  Joint = 'Joint',
  // Non-individual account held by an informal trust.

  InformalTrust = 'Informal Trust',
  // Non-individual account held by a corporation.

  Corporation = 'Corporation',
  // Non-individual account held by an investment club.

  InvestmentClub = 'Investment Club',
  // Non-individual account held by a formal trust.

  FormalTrust = 'Formal Trust',
  // Non-individual account held by a partnership.

  Partnership = 'Partnership',
  // Non-individual account held by a sole proprietorship.

  SoleProprietorship = 'Sole Proprietorship',
  // Account held by a family.

  Family = 'Family',
  // Non-individual account held by a joint and informal trust.

  JointAndInformalTrust = 'Joint and Informal Trust',
  // Non-individual account held by an institution.

  Institution = 'Institution',
}
