'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { maskEmail } from '@/lib/email-mask';

interface MaskedEmailProps {
  email: string;
  variant?: 'simple' | 'advanced' | 'minimal';
  showRevealButton?: boolean;
  className?: string;
}

export function MaskedEmail({ 
  email, 
  variant = 'simple', 
  showRevealButton = false,
  className = ''
}: MaskedEmailProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  
  const getMaskedEmail = () => {
    switch (variant) {
      case 'advanced':
        return maskEmailAdvanced(email);
      case 'minimal':
        return maskEmailMinimal(email);
      default:
        return maskEmail(email);
    }
  };

  const displayEmail = isRevealed ? email : getMaskedEmail();

  if (!showRevealButton) {
    return <span className={className}>{displayEmail}</span>;
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="font-mono text-sm">{displayEmail}</span>
      <button
        onClick={() => setIsRevealed(!isRevealed)}
        className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
        title={isRevealed ? 'Hide email' : 'Reveal email'}
      >
        {isRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

// Helper functions (re-exported for convenience)
function maskEmailAdvanced(email: string): string {
  if (!email || !email.includes('@')) return email;
  const [localPart, domain] = email.split('@');
  
  let maskedLocal;
  if (localPart.length <= 2) {
    maskedLocal = localPart.charAt(0) + '*'.repeat(2);
  } else {
    const stars = '*'.repeat(Math.max(localPart.length - 2, 1));
    maskedLocal = localPart.charAt(0) + stars + localPart.charAt(localPart.length - 1);
  }
  
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

function maskEmailMinimal(email: string): string {
  if (!email || !email.includes('@')) return email;
  const [localPart, domain] = email.split('@');
  
  const maskedLocal = localPart.charAt(0) + '***';
  const maskedDomain = domain.charAt(0) + '***.' + domain.split('.').pop();
  
  return `${maskedLocal}@${maskedDomain}`;
}