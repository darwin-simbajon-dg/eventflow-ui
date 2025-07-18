import { useEffect, useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { signUp } from "../service/api";

interface RegisterFormProps {
  student: {
    studentNumber: string;
    firstname: string;
    lastname: string;
    college: string;
    email: string;
    alternativeEmail: string;
    password: string;
  };
}

const Register: React.FC<RegisterFormProps> = ({ student }) => {
  const [formData, setFormData] = useState({ ...student });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormData({ ...student });
  }, [student]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  // Update the field
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  // Run field-level validation as the user types
  const error = validateField(name, value);
  setErrors((prev) => ({
    ...prev,
    [name]: error,
  }));
};

const validateField = (name: string, value: string) => {
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //const numberRegex = /^[0-9]{8,10}$/;
  //const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  switch (name) {
    case "studentNumber":
      if (!value.trim()) return "Student number is required.";
      //if (!numberRegex.test(value)) return "Must be 8–10 digits.";
      break;
    case "firstname":
    case "lastname":
      if (!value.trim()) return `${name === "firstname" ? "First" : "Last"} name is required.`;
      if (!nameRegex.test(value)) return "Letters only.";
      break;
    case "college":
      if (!value.trim()) return "College/Program is required.";
      if (!nameRegex.test(value)) return "Letters and spaces only.";
      break;
    case "email":
    case "alternativeEmail":
      if (!value.trim()) return "Email is required.";
      if (!emailRegex.test(value)) return "Invalid email format.";
      break;
    case "password":
      if (!value.trim()) return "Password is required.";
      //if (!passwordRegex.test(value)) return "At least 6 chars w/ letters & numbers.";
      break;
  }
  return "";
};

const validate = () => {
  const newErrors: { [key: string]: string } = {};
  Object.entries(formData).forEach(([key, value]) => {
    const error = validateField(key, value);
    if (error) newErrors[key] = error;
  });
  return newErrors;
};

  const handleSignUp = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await signUp(formData);
  };

  const handleSignIn = async () => {
    useAppStore.getState().setState({
      userAuthenticated: false,
      showLogin: true,
      showRegister: false,
    });
  };

  return (
    <main className="main-content mt-0">
      <section>
        <div className="page-header min-vh-100">
          <div className="container">
            <div className="row">
              {/* Background Image*/}
              <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                <div
                  className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                  style={{
                    backgroundImage:
                      "url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-ill.jpg')",
                    backgroundSize: "cover",
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

               {/* Sign-up Form - now on the right */}
              <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                <div className="card card-plain">
                  <div className="card-header pb-0 text-left">
                    <h4 className="font-weight-bolder">Sign Up</h4>
                    <p className="mb-0">Enter your details</p>
                  </div>
                  <div className="card-body pb-3">
                    <form role="form" onSubmit={(e) => e.preventDefault()}>
                      {[
                        { label: "Student Number", name: "studentNumber" },
                        { label: "Firstname", name: "firstname" },
                        { label: "Lastname", name: "lastname" },
                        { label: "College/Program", name: "college" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Alternative Email", name: "alternativeEmail", type: "email" },
                        { label: "Password", name: "password", type: "password" },
                      ].map((field) => (
                        <div className="mb-3" key={field.name}>
                          <label>{field.label}</label>
                          <input
                            type={field.type || "text"}
                            className={`form-control ${errors[field.name] ? "is-invalid" : ""}`}
                            name={field.name}
                            placeholder={field.label}
                            aria-label={field.label}
                            value={(formData as any)[field.name]}
                            onChange={handleChange}
                          />
                          {errors[field.name] && (
                            <div className="invalid-feedback">{errors[field.name]}</div>
                          )}
                        </div>
                      ))}

                      <div className="text-center">
                        <button
                          type="button"
                          className="btn btn-primary w-100 mt-4 mb-0"
                          onClick={handleSignUp}
                        >
                          Sign up
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center pt-0 px-sm-4 px-1">
                    <p className="mb-4 mx-auto">
                      Already have an account?{" "}
                      <a href="#" className="text-primary font-weight-bold" onClick={handleSignIn}>
                        Sign in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
