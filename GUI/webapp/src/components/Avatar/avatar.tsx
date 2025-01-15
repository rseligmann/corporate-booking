import React from 'react';
import './Avatar.scss';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  size = 'md',
  className = ''
}) => {
  const [hasError, setHasError] = React.useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const avatarClasses = [
    'avatar',
    `avatar--${size}`,
    className
  ].filter(Boolean).join(' ');

  const getFallback = () => {
    if (!fallback) return '';
    return fallback.slice(0, 2).toUpperCase();
  };

  return (
    <div className={avatarClasses}>
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          className="avatar__image"
          onError={handleError}
        />
      ) : (
        <div className="avatar__fallback">
          {getFallback()}
        </div>
      )}
    </div>
  );
};

export const AvatarGroup: React.FC<{
  children: React.ReactNode;
  max?: number;
  className?: string;
}> = ({
  children,
  max,
  className = ''
}) => {
  const avatars = React.Children.toArray(children);
  const shouldLimit = max && avatars.length > max;
  const visibleAvatars = shouldLimit ? avatars.slice(0, max) : avatars;
  const remainingCount = shouldLimit ? avatars.length - max : 0;

  return (
    <div className={`avatar-group ${className}`}>
      {visibleAvatars}
      {remainingCount > 0 && (
        <div className="avatar avatar--md">
          <div className="avatar__fallback">
            +{remainingCount}
          </div>
        </div>
      )}
    </div>
  );
};