/**
 * Masks an email address for privacy protection
 * Examples:
 * john.doe@example.com → j***@e***.com
 * user@gmail.com → u***@g***.com
 * a@b.co → a***@b***.co
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) {
    return email;
  }

  const [localPart, domain] = email.split('@');
  
  // Mask local part (keep first character)
  const maskedLocal = localPart.charAt(0) + '*'.repeat(Math.max(localPart.length - 1, 3));
  
  // Mask domain (keep first character and TLD)
  const domainParts = domain.split('.');
  if (domainParts.length >= 2) {
    const maskedDomainName = domainParts[0].charAt(0) + '*'.repeat(Math.max(domainParts[0].length - 1, 3));
    const tld = domainParts.slice(1).join('.');
    return `${maskedLocal}@${maskedDomainName}.${tld}`;
  }
  
  // Fallback for single domain
  const maskedDomain = domain.charAt(0) + '*'.repeat(Math.max(domain.length - 1, 3));
  return `${maskedLocal}@${maskedDomain}`;
}

/**
 * Alternative masking - shows first and last character
 * Examples:
 * john.doe@example.com → j*****e@e*****e.com
 */
export function maskEmailAdvanced(email: string): string {
  if (!email || !email.includes('@')) {
    return email;
  }

  const [localPart, domain] = email.split('@');
  
  // Mask local part (keep first and last character if length > 2)
  let maskedLocal;
  if (localPart.length <= 2) {
    maskedLocal = localPart.charAt(0) + '*'.repeat(2);
  } else {
    const stars = '*'.repeat(Math.max(localPart.length - 2, 1));
    maskedLocal = localPart.charAt(0) + stars + localPart.charAt(localPart.length - 1);
  }
  
  // Mask domain
  const domainParts = domain.split('.');
  if (domainParts.length >= 2) {
    const domainName = domainParts[0];
    let maskedDomainName;
    
    if (domainName.length <= 2) {
      maskedDomainName = domainName.charAt(0) + '*'.repeat(2);
    } else {
      const stars = '*'.repeat(Math.max(domainName.length - 2, 1));
      maskedDomainName = domainName.charAt(0) + stars + domainName.charAt(domainName.length - 1);
    }
    
    const tld = domainParts.slice(1).join('.');
    return `${maskedLocal}@${maskedDomainName}.${tld}`;
  }
  
  return `${maskedLocal}@${domain}`;
}

/**
 * Minimal masking - only shows initials
 * Examples:
 * john.doe@example.com → j***@e***.com
 */
export function maskEmailMinimal(email: string): string {
  if (!email || !email.includes('@')) {
    return email;
  }

  const [localPart, domain] = email.split('@');
  
  const maskedLocal = localPart.charAt(0) + '***';
  const maskedDomain = domain.charAt(0) + '***.' + domain.split('.').pop();
  
  return `${maskedLocal}@${maskedDomain}`;
}