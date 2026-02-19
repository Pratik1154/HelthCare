import React, { useState } from 'react'


const Login = () => {

    const [state, setState] = useState('Sign Up')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

   const onSubmitHandler = async (event) => {
        event.preventDefault();
   }

  return (
    <form className="min-h-[80vh] flex items-center justify-center ">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 animate-fadeIn bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out ">
          <p className=' text-2xl font-semibold text-center'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
          <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p> 
          {
            state ==="Sign Up" &&      
          <div className='w-full '>
              <p>Full Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className="w-full p-3 mt-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200" type="text" required />
            </div >
           }
          <div className='w-full '>
            <p>Email</p>
            <input onChange={(e) => setName(e.target.value)} value={email} className="w-full p-3 mt-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200" type="email" required />
          </div>
          <div className='w-full '>
            <p>password</p>
            <input onChange={(e) => setName(e.target.value)} value={password} className="w-full p-3 mt-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200" type="password" required />
          </div>
          <button className="w-full py-3 my-3 rounded-lg text-white text-base font-medium bg-primary hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all duration-200">{state === 'Sign Up' ? 'Create account' : 'Login'}</button>
            {state === 'Sign Up'
              ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
              : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
             }
         </div>  
    </form>
  )
}
export default Login
