export enum DocumentType {
  DNI = 'DNI',           // Documento de identidad (persona)
  CEDULA = 'Cédula',     // Cédula de identidad (persona)
  PASAPORTE = 'Pasaporte',  // Pasaporte (persona)
  RUC = 'RUC',           // Registro Único de Contribuyente (empresa)
  CIF = 'CIF',           // Código de Identificación Fiscal (empresa)
  NIT = 'NIT',           // Número de Identificación Tributaria (empresa)
  NIF = 'NIF',           // Número de Identificación Fiscal (empresa)
  VAT = 'VAT',           // Número de identificación fiscal (empresa)
  OTRO = 'Otro',         // Otro tipo genérico (para personas o empresas)
}