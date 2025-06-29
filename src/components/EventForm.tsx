import React, { useEffect, useRef, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useAppStore } from '../store/useAppStore';
// import { create } from 'zustand';
import { createEvent, updateEvent } from '../service/api';

interface EventFormProps {
  event: {
    eventId: string;
    title: string;
    headline: string;
    notes: string
    description: string;
    date: string;
    venue: string;
    time: string;
    imageUrl?: string;
    link?: string;
  };
//   onSave: (updated: any) => void;
}

const EventForm: React.FC<EventFormProps> = ({ event }) => {
  const [formData, setFormData] = useState({
    ...event,
  });
  const isEdit = useAppStore((state) => state.isEdit);
 

  const [previewImage, setPreviewImage] = useState(event.imageUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData({ ...event });
    setPreviewImage(event.imageUrl || '');
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setFormData((prev) => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // onSave(formData);

  
    if(isEdit) {
     await updateEvent(formData);
   }
    else {
      await createEvent(formData);

    }

  
  };

  return (
    <main className="main-content">
      <form className="card card-body shadow-sm" onSubmit={handleSave}>
        <h4 className="text-dark font-weight-bold mb-3">{isEdit ? 'Edit Event' : 'Create Event'}</h4>

        {/* Poster */}
        <div className="mb-3 position-relative" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
          <img
            src={previewImage}
            alt="Event Poster"
            className="w-100 border-radius-lg shadow-sm"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
          <div className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1 shadow">
            <i className="fas fa-camera text-primary" style={{ fontSize: '0.9rem' }}></i>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Headline</label>
          <input
            name="headline"
            className="form-control"
            value={formData.headline}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Notes</label>
          <input
            name="notes"
            className="form-control"
            value={formData.notes || 'Don\'t forget your ID for verification. See you there!'}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          {/* Date */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Time */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Time</label>
            <input
              type="time"
              name="time"
              className="form-control"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          {/* Venue */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Venue</label>
            <input
              name="venue"
              className="form-control"
              value={formData.venue}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Link */}
        <div className="mb-3">
          <label className="form-label">External Link (Optional)</label>
          <input
            name="link"
            className="form-control"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>

        {/* Submit */}
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success" onClick={handleSave}>
            <i className="fas fa-save pe-2"></i> Save Changes
          </button>
        </div>
      </form>
    </main>
  );
};

export default EventForm;
