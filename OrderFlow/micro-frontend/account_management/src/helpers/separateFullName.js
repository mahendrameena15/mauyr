export default function separateFullName(fullName) {
    const nameParts = fullName.trim().split(' ');
  
    if (nameParts.length < 2) {
      // If the full name has less than two parts, assume it's only a first name
      return {
        firstName: fullName,
        lastName: ''
      };
    }
  
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
  
    return {
      firstName,
      lastName
    };
  }