// services/api.ts

// Use environment variables if available, otherwise fallback to the EC2 IP
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://13.61.212.73';

// Helper function to determine the full URL for API requests
const getApiUrl = (endpoint: string) => {
  // If API_URL is already a full URL, use it directly
  if (API_URL.startsWith('http')) {
    return `${API_URL}${endpoint}`;
  }
  
  // If API_URL is a relative path (like '/api'), use the backend URL
  return `${BACKEND_URL}${API_URL}${endpoint}`;
};

// Helper function to fix image URLs
const fixImageUrl = (imagePath: string) => {
  if (!imagePath) return '';
  
  // If the image already has a full URL, return it as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Otherwise, prepend the backend URL
  return `${BACKEND_URL}${imagePath}`;
};

export async function fetchPersonalInfo() {
  try {
    const response = await fetch(getApiUrl('/personal-info/'));
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      // Fix image URL
      data[0].image = fixImageUrl(data[0].image);
      return data[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching personal info:', error);
    return null;
  }
}

export async function fetchSkills() {
  try {
    const response = await fetch(getApiUrl('/skills/'));
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

export async function fetchProjects() {
  try {
    const response = await fetch(getApiUrl('/projects/'));
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Fix project image URLs
    return data.map((project: any) => ({
      ...project,
      image: fixImageUrl(project.image)
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function fetchExperiences() {
  try {
    const response = await fetch(getApiUrl('/experiences/'));
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}

export async function fetchEducation() {
  try {
    const response = await fetch(getApiUrl('/education/'));
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching education:', error);
    return [];
  }
}

export async function submitContactForm(formData: any) {
  try {
    const response = await fetch(getApiUrl('/contact/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}