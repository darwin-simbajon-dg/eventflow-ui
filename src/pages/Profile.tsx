import React, { useRef, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { enqueueSnackbar } from 'notistack';
import { updateProfile } from '../service/api';

const ProfileCard: React.FC = () => {
  const userData = useAppStore((state) => state.userData);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState(userData?.imageUrl || '');

  // Local state for form values
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || '',
    firstName: userData?.fullName?.split(' ')[0] || '',
    lastName: userData?.fullName?.split(' ')[1] || '',
    studentNumber: userData?.studentNumber || '',
    college: userData?.college || '',
    email: userData?.email || '',
    alternateEmail: userData?.alternateEmail || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleImageClick = () => {
    if (isEditing) fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

const handleSave = async () => {
  try {
    if (userData) {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      
      await updateProfile(userData.userId, {
        ...formData,
        fullName,
      }, selectedImage); // `selectedImage` contains base64
   
      useAppStore.getState().setState({
        userData: {
          ...userData,
          ...formData,
          fullName,
          imageUrl: selectedImage, // Update with the new image URL
          username: userData.username || '', // Ensure username is always defined
          userId: userData.userId || '', // Ensure userId is always defined
        },
      });

    } else {
      enqueueSnackbar("User data is missing", { variant: "error" });
    }
    enqueueSnackbar("Profile updated successfully", { variant: "success" });
    setIsEditing(false);
  } catch {
    enqueueSnackbar("Failed to update profile", { variant: "error" });
  }
};


  return (
    <div className="col-lg-12 mt-lg-0 mt-4">
      <div className="card card-body position-relative" id="profile">
        {/* Top-right buttons */}
        <div className="position-absolute d-flex gap-2" style={{ top: '12px', right: '12px' }}>
          {isEditing && (
            <button
              className="border-0 bg-transparent text-success"
              onClick={handleSave}
              title="Save Changes"
            >
              <i className="fas fa-save" style={{ fontSize: '1.25rem' }}></i>
            </button>
          )}

          <button
            className="border-0 bg-transparent text-secondary"
            onClick={() => setIsEditing(!isEditing)}
            title={isEditing ? "Cancel Editing" : "Edit Profile"}
          >
            <i className="fas fa-edit" style={{ fontSize: '1.25rem' }}></i>
          </button>
        </div>

        <div className="row justify-content-center align-items-center">
          <div className="col-sm-auto col-4">
          <div className="avatar avatar-xl position-relative" onClick={handleImageClick} style={{ cursor: isEditing ? 'pointer' : 'default' }}>
          <img
            src={selectedImage}
            alt="Profile"
            className="w-100 border-radius-lg shadow-sm"
          />
          {isEditing && (
            <div className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1 shadow">
              <i className="fas fa-camera text-primary" style={{ fontSize: '0.9rem' }}></i>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
          </div>
          <div className="col-sm-auto col-8 my-auto">
            <div className="h-100">
              <h5 className="mb-1 font-weight-bolder">
              {isEditing ? (
                <div className="d-flex gap-2">
                  <input
                    className="form-control"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <input
                    className="form-control"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                `${formData.firstName} ${formData.lastName}`
              )}

              </h5>
              <p className="mb-0 font-weight-bold text-sm">{userData?.role}</p>
            </div>
          </div>
        </div>

        <div className="card-body pt-0">
          <div className="row">
            <div className="col-6">
              <label className="form-label">Student Number</label>
              {isEditing ? (
                <input
                  name="studentNumber"
                  className="form-control"
                  value={formData.studentNumber}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext">{formData.studentNumber}</p>
              )}
            </div>
            <div className="col-6">
              <label className="form-label">College/Program</label>
              {isEditing ? (
                <input
                  name="college"
                  className="form-control"
                  value={formData.college}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext">{formData.college}</p>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label mt-4">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext">{formData.email}</p>
              )}
            </div>
            <div className="col-6">
              <label className="form-label mt-4">Alternative Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="alternateEmail"
                  className="form-control"
                  value={formData.alternateEmail}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext">{formData.alternateEmail}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
