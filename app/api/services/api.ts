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

// Common fetch options with CORS handling
const fetchOptions = {
  mode: 'cors' as RequestMode,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Add console logs to debug API URLs
export async function fetchPersonalInfo() {
  try {
    const url = getApiUrl('/personal-info/');
    console.log('Fetching personal info from:', url);
    
    const response = await fetch(url, fetchOptions);
    console.log('Personal info response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Personal info error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Personal info data received:', data);
    
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
    const url = getApiUrl('/skills/');
    console.log('Fetching skills from:', url);
    
    const response = await fetch(url, fetchOptions);
    console.log('Skills response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Skills error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Skills data received:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

export async function fetchProjects() {
  try {
    const url = getApiUrl('/projects/');
    console.log('Fetching projects from:', url);
    
    const response = await fetch(url, fetchOptions);
    console.log('Projects response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Projects error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Projects data received:', data);
    
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
    const url = getApiUrl('/experiences/');
    console.log('Fetching experiences from:', url);
    
    const response = await fetch(url, fetchOptions);
    console.log('Experiences response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Experiences error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Experiences data received:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}

export async function fetchEducation() {
  try {
    const url = getApiUrl('/education/');
    console.log('Fetching education from:', url);
    
    const response = await fetch(url, fetchOptions);
    console.log('Education response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Education error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Education data received:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching education:', error);
    return [];
  }
}

export async function submitContactForm(formData: any) {
  try {
    const url = getApiUrl('/contact/');
    console.log('Submitting contact form to:', url);
    
    const response = await fetch(url, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify(formData),
    });
    
    console.log('Contact form response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Contact form error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Contact form response data:', data);
    
    return data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}