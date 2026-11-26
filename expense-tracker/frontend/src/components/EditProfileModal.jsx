import React, { useState } from 'react';
import { updateUserProfile } from '../services/api';

export default function EditProfileModal({ user, onClose, onUpdate }) {
  const [name, setName] = useState(user.name || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const response = await updateUserProfile(formData);
      
      const updatedUser = {
        name: response.user.name,
        email: response.user.email,
        avatar: response.user.avatar ? `http://localhost:4000${response.user.avatar}` : user.avatar
      };

      onUpdate(updatedUser);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#181820] border border-white/10 rounded-2xl w-full max-w-md p-6 text-white shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Edit Profile</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-lg">×</button>
        </div>

        {error && <div className="mb-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Display Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#121216] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Profile Avatar Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files[0])}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition text-sm font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold transition text-sm disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
