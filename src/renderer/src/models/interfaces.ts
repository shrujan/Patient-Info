export interface PatientFormData {
  id: number,
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  phone: string
  address?: string
}

export interface PatientListType {
  patientList: PatientFormData[]
}
