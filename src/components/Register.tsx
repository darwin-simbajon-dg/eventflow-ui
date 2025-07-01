import { useEffect, useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { signUp } from "../service/api";


interface RegisterFormProps {
    student: {
      studentNumber: string;
      firstname: string;
      lastname: string;
      college: string
      email: string;
      alternativeEmail: string;
      password: string;
    };
  //   onSave: (updated: any) => void;
  }

const Register : React.FC<RegisterFormProps> = ({student}) => {
 const [formData, setFormData] = useState({
    ...student,
  });

  useEffect(() => {
      setFormData({ ...student });
    }, [student]);
  

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     const { name, value } = e.target;
     setFormData((prev) => ({
       ...prev,
       [name]: value,
     }));
   };
   
   
const handleSignIn = async () => {

    useAppStore.getState().setState({
        userAuthenticated: false,
        showLogin: true,
        showRegister: false
    })

}

const handleSignUp = async () => {

    await signUp(formData);

}

return (
<main className="main-content mt-0">
      <section>
        <div className="page-header min-vh-100">
          <div className="container">
            <div className="row">
              {/* Form Panel */}
              <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                <div className="card card-plain">
                  <div className="card-header pb-0 text-left">
                    <h4 className="font-weight-bolder">Sign Up</h4>
                    <p className="mb-0">Enter your details</p>
                  </div>
                  <div className="card-body pb-3">
                    <form role="form">
                     <label>Student Number</label>
                      <div className="mb-3">
                        <input type="text" className="form-control" name="studentNumber" placeholder="Name" aria-label="Name" value={formData.studentNumber} onChange={handleChange}/>
                      </div>
                      <label>Firstname</label>
                      <div className="mb-3">
                        <input type="text" className="form-control" name="firstname" placeholder="Name" aria-label="Name" value={formData.firstname} onChange={handleChange}/>
                      </div>
                      <label>Lastname</label>
                      <div className="mb-3">
                        <input type="text" className="form-control" name="lastname" placeholder="Name" aria-label="Name" value={formData.lastname} onChange={handleChange}/>
                      </div>
                      <label>College/Program</label>
                      <div className="mb-3">
                        <input type="text" className="form-control" name="college" placeholder="Name" aria-label="Name" value={formData.college} onChange={handleChange}/>
                      </div>
                      <label>Email</label>
                      <div className="mb-3">
                        <input type="email" className="form-control" name="email" placeholder="Email" aria-label="Email" value={formData.email} onChange={handleChange}/>
                      </div>
                      <label>Alternative Email</label>
                      <div className="mb-3">
                        <input type="email" className="form-control" name="alternativeEmail" placeholder="Name" aria-label="Name" value={formData.alternativeEmail} onChange={handleChange}/>
                      </div>
                      <label>Password</label>
                      <div className="mb-3">
                        <input type="password" className="form-control" name="password" placeholder="Name" aria-label="Name" value={formData.password} onChange={handleChange}/>
                      </div>
                                         
                      <div className="text-center">
                        <button type="button" className="btn btn-primary w-100 mt-4 mb-0" onClick={handleSignUp}>
                          Sign up
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center pt-0 px-sm-4 px-1">
                    <p className="mb-4 mx-auto">
                      Already have an account?{' '}
                      <a href="#" className="text-primary font-weight-bold" onClick={handleSignIn}>
                        Sign in
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Illustration Panel */}
              <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                <div
                  className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                  style={{
                    backgroundImage:
                      "url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-ill.jpg')",
                    backgroundSize: 'cover',
                  }}
                >
                  <span className="mask bg-primary opacity-4"></span>
                  <h4 className="mt-5 text-white font-weight-bolder position-relative">
                    Your journey starts here
                  </h4>
                  <p className="text-white position-relative">
                    Just as it takes a company to sustain a product, it takes a community to sustain a protocol.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
)

}

export default Register;