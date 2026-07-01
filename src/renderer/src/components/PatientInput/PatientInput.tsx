import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { addPatient, editPatient } from '../../store/patientSlice';
import { PatientFormData, PatientListType } from "@renderer/models/interfaces";
import MaterialInput from "../shared/MaterialInput";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PatientInput() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PatientFormData>();
  const dispatch    = useDispatch();
  const patientList = useSelector( (state: PatientListType) => state.patientList );
  const param       = useParams();
  const navigate    = useNavigate();
  
  const [ editMode, setEditMode ] = useState(false);
  const today = new Date().toISOString().split('T')[0];


  useEffect(() => {
    if (param && param.id) {
      setEditMode(true);

      // populate the form
      const patientInfo = patientList.find( patient => String(patient.id) === String(param.id) );

      reset( { ...patientInfo } )
    }
  }, [ param ])

  const onSubmit = (patientInfo: PatientFormData) => {
    if (editMode) {
      dispatch( editPatient( { ...patientInfo } ) ) 
      navigate('/')
    } else {
      dispatch( addPatient({ ...patientInfo, id: crypto.randomUUID() }) )
    }
    reset()
  }

  return (
    <div className="w-full max-w-lg mx-auto p-6">

      <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">{ editMode ? `Edit Patients Information` : 'Add a new Patient ' }</h2>

      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-x-6 mb-6">
          <MaterialInput
            id='firstName'
            label="First Name"
            error={errors.firstName?.message}
            {...register('firstName', { required: 'First name is required' })}
          />
          <MaterialInput
            id='lastName'
            label="Last Name"
            error={errors.lastName?.message}
            {...register('lastName', { required: 'Last name is required' })}
          />
        </div>

        <div className="mb-6">
          <MaterialInput
            id='dob'
            label="Date of Birth"
            type="date"
            max={today}
            error={errors.dateOfBirth?.message}
            {...register('dateOfBirth', { required: 'Date of birth is required' })}
          />
        </div>
        
        <div className="mb-6">
           <MaterialInput
            id='email'
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
        </div>
       
        <div className="mb-6">
          <MaterialInput
            id="phone"
            label="Phone"
            error={errors.phone?.message}
            {...register('phone', {
              required: 'Phone is required',
              pattern: {
                value: /^\+?[1-9]\d{1,10}$/,
                message: "Enter a valid phone number",
              },
              minLength: { value: 10, message: 'Phone must be at least 10 digits' },
            })}
          />
        </div>
        
        <div className="mb-6">
          <MaterialInput
            id="address"
            label="Address"
            {...register('address')}
          />
        </div>
        
        <div className="flex gap-3 justify-center items-center">
          <button 
            className="mt-4 w-[45%] rounded border py-2 text-sm font-medium 
              text-white uppercase tracking-wide shadow cursor-pointer hover:bg-gray-900" 
              onClick={ () => navigate('/') }>
            Cancel
          </button>
          <button
            type="submit"
            className="mt-4 w-[45%] rounded bg-blue-600 py-2.5 text-sm font-medium text-white uppercase tracking-wide
              shadow hover:bg-blue-700 cursor-pointer"
          >
            { editMode ? 'Update Patient' : 'Add Patient' }
          </button>
        </div>
        
      </form>
    </div>
  )
}

export default PatientInput
