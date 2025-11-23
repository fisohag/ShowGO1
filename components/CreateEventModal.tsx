import React, { useState, useEffect } from 'react';
import { X, Upload, Calendar, Clock, MapPin, DollarSign, Tag, Type, ImageIcon } from 'lucide-react';
import { Event } from '../types';
import Button from './Button';
import { CATEGORIES } from '../constants';

interface CreateEventModalProps {
  onClose: () => void;
  onSubmit: (eventData: Event | Omit<Event, 'id'>) => void; 
  initialData?: Event; 
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Omit<Event, 'id'>>({
    eventName: '',
    description: '',
    image: '',
    venue: '',
    location: '',
    date: '',
    time: '',
    category: 'Electronic',
    price: '',
    link: '#'
  });

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      // Destructure to avoid copying 'id' into the formData state if it expects Omit<Event, 'id'>
      // But we will merge it back on submit
      const { id, ...rest } = initialData;
      setFormData(rest);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If we have an image string (either URL or base64), use it. 
    // If empty, use a placeholder.
    const finalData = {
        ...formData,
        image: formData.image || `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`
    };

    if (initialData) {
        onSubmit({ ...finalData, id: initialData.id });
    } else {
        onSubmit(finalData);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-[100]">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-dark-card border border-dark-border p-0 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-slide-up overflow-hidden">
        
        <div className="p-4 border-b border-dark-border flex justify-between items-center bg-dark-surface/50">
          <h2 className="text-xl font-bold text-white">{initialData ? 'Edit Event' : 'Create New Event'}</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors"><X className="text-white" /></button>
        </div>

        <div className="overflow-y-auto p-6 custom-scrollbar">
            <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Event Name */}
            <div className="relative">
                <Type className="absolute left-3 top-3 text-text-secondary h-5 w-5" />
                <input type="text" name="eventName" placeholder="Event Name" value={formData.eventName} onChange={handleChange} required 
                    className="w-full pl-10 p-3 rounded-lg bg-dark-surface border border-dark-border text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all" />
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                    <Tag className="absolute left-3 top-3 text-text-secondary h-5 w-5" />
                    <select name="category" value={formData.category} onChange={handleChange} 
                        className="w-full pl-10 p-3 rounded-lg bg-dark-surface border border-dark-border text-white focus:border-neon-purple outline-none appearance-none">
                        {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="relative">
                    <DollarSign className="absolute left-3 top-3 text-text-secondary h-5 w-5" />
                    <input type="text" name="price" placeholder="Price (e.g. $50)" value={formData.price} onChange={handleChange} required 
                        className="w-full pl-10 p-3 rounded-lg bg-dark-surface border border-dark-border text-white focus:border-neon-purple outline-none" />
                </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-text-secondary h-5 w-5" />
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required 
                        className="w-full pl-10 p-3 rounded-lg bg-dark-surface border border-dark-border text-white focus:border-neon-purple outline-none [color-scheme:dark]" />
                </div>
                <div className="relative">
                    <Clock className="absolute left-3 top-3 text-text-secondary h-5 w-5" />
                    <input type="time" name="time" value={formData.time} onChange={handleChange} required 
                        className="w-full pl-10 p-3 rounded-lg bg-dark-surface border border-dark-border text-white focus:border-neon-purple outline-none [color-scheme:dark]" />
                </div>
            </div>

            {/* Venue & Location */}
            <div className="grid grid-cols-2 gap-4">
                 <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-text-secondary h-5 w-5" />
                    <input type="text" name="venue" placeholder="Venue Name" value={formData.venue} onChange={handleChange} required 
                        className="w-full pl-10 p-3 rounded-lg bg-dark-surface border border-dark-border text-white focus:border-neon-purple outline-none" />
                </div>
                <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-text-secondary h-5 w-5" />
                    <input type="text" name="location" placeholder="City, State" value={formData.location} onChange={handleChange} required 
                        className="w-full pl-10 p-3 rounded-lg bg-dark-surface border border-dark-border text-white focus:border-neon-purple outline-none" />
                </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
                <label className="text-sm text-text-secondary ml-1">Event Image</label>
                <div className="border border-dashed border-dark-border rounded-lg p-4 text-center hover:border-neon-purple transition-colors bg-dark-surface/30">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="hidden" 
                        id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center gap-2">
                        {formData.image ? (
                             <img src={formData.image} alt="Preview" className="h-32 object-cover rounded-md" />
                        ) : (
                            <>
                                <Upload className="h-8 w-8 text-text-secondary" />
                                <span className="text-sm text-text-secondary">Click to upload image</span>
                            </>
                        )}
                    </label>
                </div>
                <div className="relative">
                    <ImageIcon className="absolute left-3 top-3 text-text-secondary h-5 w-5" />
                     <input type="text" name="image" placeholder="Or paste Image URL" value={formData.image} onChange={handleChange} 
                        className="w-full pl-10 p-3 rounded-lg bg-dark-surface border border-dark-border text-white focus:border-neon-purple outline-none text-sm" />
                </div>
            </div>

            {/* Description */}
            <textarea name="description" placeholder="Event Description..." rows={4} value={formData.description} onChange={handleChange} required 
                className="w-full p-3 rounded-lg bg-dark-surface border border-dark-border text-white focus:border-neon-purple outline-none resize-none" />

            <div className="pt-2">
                <Button type="submit" className="w-full h-12 text-lg shadow-lg shadow-neon-purple/20">
                    {initialData ? 'Save Changes' : 'Publish Event'}
                </Button>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;