export const validateProduct = (product) => {
  const errors = [];

  // Required fields
  if (!product.type) {
    errors.push('Product type is required');
  }

  if (!product.name || product.name.length < 3) {
    errors.push('Name must be at least 3 characters long');
  }

  if (!product.description || product.description.length < 10) {
    errors.push('Description must be at least 10 characters long');
  }

  // Features validation
  if (!Array.isArray(product.features) || product.features.length === 0) {
    errors.push('At least one feature must be provided');
  } else {
    product.features.forEach((feature, index) => {
      if (!feature || feature.trim().length === 0) {
        errors.push(`Feature ${index + 1} cannot be empty`);
      }
    });
  }

  // Requirements validation
  if (!Array.isArray(product.requirements) || product.requirements.length === 0) {
    errors.push('At least one system requirement must be provided');
  } else {
    product.requirements.forEach((req, index) => {
      if (!req || req.trim().length === 0) {
        errors.push(`Requirement ${index + 1} cannot be empty`);
      }
    });
  }

  // Pricing validation
  if (!product.pricing || Object.keys(product.pricing).length === 0) {
    errors.push('At least one pricing option must be provided');
  } else {
    const validPeriods = ['2h', 'day', 'week', 'month'];
    Object.entries(product.pricing).forEach(([period, price]) => {
      if (!validPeriods.includes(period)) {
        errors.push(`Invalid period: ${period}`);
      }
      if (typeof price !== 'number' || price <= 0) {
        errors.push(`Invalid price for ${period}: ${price}`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateStatus = (status) => {
  const validStatuses = ['undetected', 'detected', 'updating', 'testing', 'closed'];
  return validStatuses.includes(status);
};