export const APP_CONFIG = {
  name: 'LivePace',
  description: 'Home to Beautiful Interiors',
  contact: {
    phone: '+91 9876543210',
    email: 'info@livepace.com',
    address: '123 Design Street, Interior City, IC 12345'
  },
  social: {
    facebook: 'https://facebook.com/livepace',
    instagram: 'https://instagram.com/livepace',
    pinterest: 'https://pinterest.com/livepace'
  }
};

export const PROJECT_TYPES = [
  { value: 'full-home', label: 'Full Home Interior' },
  { value: 'kitchen', label: 'Kitchen Only' },
  { value: 'bedroom', label: 'Bedroom Only' },
  { value: 'living', label: 'Living Room Only' },
  { value: 'office', label: 'Office Space' }
];

export const DESIGN_STYLES = [
  { value: 'standard', label: 'Standard' },
  { value: 'premium', label: 'Premium' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'custom', label: 'Custom Design' }
];

export const ADDITIONAL_SERVICES = [
  { id: 'smartHome', label: 'Smart Home Integration', cost: 50000 },
  { id: 'customFurniture', label: 'Custom Furniture', cost: 75000 },
  { id: 'lightingDesign', label: 'Professional Lighting Design', cost: 30000 }
];