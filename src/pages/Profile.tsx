import React from 'react';

const ProfileCard: React.FC = () => {
    return (
      <div className="col-lg-9 mt-lg-0 mt-4">
        <div className="card card-body" id="profile">
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-auto col-4">
              <div className="avatar avatar-xl position-relative">
                <img
                  src="/assets/img/team-3.jpg"
                  alt="Mark Johnson"
                  className="w-100 border-radius-lg shadow-sm"
                />
              </div>
            </div>
            <div className="col-sm-auto col-8 my-auto">
              <div className="h-100">
                <h5 className="mb-1 font-weight-bolder">Mark Johnson</h5>
                <p className="mb-0 font-weight-bold text-sm">CEO / Co-Founder</p>
              </div>
            </div>
            <div className="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex">
              <label className="form-check-label mb-0" htmlFor="flexSwitchCheckDefault23">
                <small>Switch to invisible</small>
              </label>
              <div className="form-check form-switch ms-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault23"
                  defaultChecked
                  onChange={() => console.log('Visibility toggled')}
                />
              </div>
            </div>
            <div className="card-body pt-0">
      <div className="row">
        <div className="col-6">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <div className="input-group">
            <input id="firstName" name="firstName" className="form-control" type="text" placeholder="Alec" required />
          </div>
        </div>
        <div className="col-6">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <div className="input-group">
            <input id="lastName" name="lastName" className="form-control" type="text" placeholder="Thompson" required />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-4 col-6">
          <label htmlFor="choices-gender" className="form-label mt-4">I'm</label>
          <select className="form-control" id="choices-gender" name="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="col-sm-8">
          <div className="row">
            <div className="col-sm-5 col-5">
              <label htmlFor="choices-month" className="form-label mt-4">Birth Date</label>
              <select className="form-control" id="choices-month" name="month" />
            </div>
            <div className="col-sm-4 col-3">
              <label htmlFor="choices-day" className="form-label mt-4">&nbsp;</label>
              <select className="form-control" id="choices-day" name="day" />
            </div>
            <div className="col-sm-3 col-4">
              <label htmlFor="choices-year" className="form-label mt-4">&nbsp;</label>
              <select className="form-control" id="choices-year" name="year" />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <label htmlFor="email" className="form-label mt-4">Email</label>
          <div className="input-group">
            <input id="email" name="email" className="form-control" type="email" placeholder="example@email.com" />
          </div>
        </div>
        <div className="col-6">
          <label htmlFor="confirmation" className="form-label mt-4">Confirmation Email</label>
          <div className="input-group">
            <input id="confirmation" name="confirmation" className="form-control" type="email" placeholder="example@email.com" />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <label htmlFor="location" className="form-label mt-4">Your location</label>
          <div className="input-group">
            <input id="location" name="location" className="form-control" type="text" placeholder="Sydney, A" />
          </div>
        </div>
        <div className="col-6">
          <label htmlFor="phone" className="form-label mt-4">Phone Number</label>
          <div className="input-group">
            <input id="phone" name="phone" className="form-control" type="tel" placeholder="+40 735 631 620" />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 align-self-center">
          <label htmlFor="choices-language" className="form-label mt-4">Language</label>
          <select className="form-control" id="choices-language" name="language">
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="choices-skills" className="form-label mt-4">Skills</label>
          <input
            className="form-control"
            id="choices-skills"
            name="skills"
            type="text"
            defaultValue="vuejs, angular, react"
            placeholder="Enter something"
          />
        </div>
      </div>
    </div>
          </div>
        </div>
        
      </div>
    );
  };
  
  export default ProfileCard;