/**
 * Centralized API Service for BraveSpeak
 * Connects frontend views to the Express + SQLite backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = options.headers || {};

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `HTTP Error ${response.status}`);
    }
    return data;
  } catch (error) {
    console.warn(`[BraveSpeak API] Error on ${endpoint}:`, error.message);
    throw error;
  }
}

// 1. Stories & Comments API
export const storiesApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/stories${query ? `?${query}` : ''}`);
  },
  getById: (id) => request(`/stories/${id}`),
  create: (storyData) => request('/stories', {
    method: 'POST',
    body: JSON.stringify(storyData)
  }),
  like: (id) => request(`/stories/${id}/like`, {
    method: 'POST'
  }),
  getComments: (id) => request(`/stories/${id}/comments`),
  addComment: (id, commentData) => request(`/stories/${id}/comments`, {
    method: 'POST',
    body: JSON.stringify(commentData)
  })
};

// 2. Legal Assistant & Laws API
export const legalApi = {
  getLaws: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/legal/laws${query ? `?${query}` : ''}`);
  },
  analyzeIncident: (incidentData) => request('/legal/analyze', {
    method: 'POST',
    body: JSON.stringify(incidentData)
  })
};

// 3. Verified Support Centers & Nearby Geolocation API
export const supportApi = {
  getCenters: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/support/centers${query ? `?${query}` : ''}`);
  },
  getNearby: (lat, lng, radius = 50) => request(`/support/nearby?lat=${lat}&lng=${lng}&radius=${radius}`)
};

// 4. Confidential Contact & Case Inquiries API
export const contactApi = {
  submitInquiry: (formData) => request('/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
  }),
  checkStatus: (refId) => request(`/contact/status/${encodeURIComponent(refId)}`)
};

// 5. Emergency SOS & Evidence Vault API
export const emergencyApi = {
  triggerSos: (sosData) => request('/emergency/sos', {
    method: 'POST',
    body: JSON.stringify(sosData)
  }),
  getSosLogs: () => request('/emergency/sos/logs'),
  vaultEvidence: (formData) => request('/emergency/evidence', {
    method: 'POST',
    body: formData
  }),
  getEvidence: () => request('/emergency/evidence'),
  deleteEvidence: (id) => request(`/emergency/evidence/${id}`, {
    method: 'DELETE'
  })
};

// 6. Community Safety Hotspots & Statistics API
export const safetyApi = {
  getHotspots: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/safety/hotspots${query ? `?${query}` : ''}`);
  },
  reportHotspot: (hotspotData) => request('/safety/report-hotspot', {
    method: 'POST',
    body: JSON.stringify(hotspotData)
  }),
  upvoteHotspot: (id) => request(`/safety/hotspots/${id}/upvote`, {
    method: 'POST'
  }),
  getStatistics: () => request('/safety/statistics')
};

export default {
  stories: storiesApi,
  legal: legalApi,
  support: supportApi,
  contact: contactApi,
  emergency: emergencyApi,
  safety: safetyApi
};
