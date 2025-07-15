// Generate a user avatar based on user's name/email
export function generateUserAvatar(user: { name?: string; email?: string }) {
  if (!user.name && !user.email) {
    return "/favicon/apple-touch-icon.png";
  }
  
  const text = user.name || user.email || "User";
  const firstChar = text.charAt(0).toUpperCase();
  
  // Create a simple color based on the first character
  const colors = [
    'bg-red-500',
    'bg-blue-500', 
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500'
  ];
  
  const colorIndex = firstChar.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];
  
  // Return a data URL for a simple colored circle with initials
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return "/favicon/apple-touch-icon.png";
  
  canvas.width = 64;
  canvas.height = 64;
  
  // Background color mapping
  const colorMap: Record<string, string> = {
    'bg-red-500': '#ef4444',
    'bg-blue-500': '#3b82f6',
    'bg-green-500': '#10b981',
    'bg-yellow-500': '#f59e0b',
    'bg-purple-500': '#8b5cf6',
    'bg-pink-500': '#ec4899',
    'bg-indigo-500': '#6366f1',
    'bg-teal-500': '#14b8a6'
  };
  
  ctx.fillStyle = colorMap[bgColor] || '#6366f1';
  ctx.fillRect(0, 0, 64, 64);
  
  ctx.fillStyle = 'white';
  ctx.font = 'bold 28px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(firstChar, 32, 32);
  
  return canvas.toDataURL();
}

// Alternative simple avatar URL generator (works better for SSR)
export function getAvatarUrl(user: { name?: string; email?: string }) {
  if (!user.name && !user.email) {
    return "/favicon/apple-touch-icon.png";
  }
  
  const text = user.name || user.email || "User";
  const firstChar = text.charAt(0).toUpperCase();
  
  // Use a service like DiceBear or UI Avatars for consistent results
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(text)}&background=6366f1&color=fff&size=64&bold=true`;
}
