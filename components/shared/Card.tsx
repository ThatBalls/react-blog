import { ReactNode } from 'react';
import Link from 'next/link';
import { CardContainer, CardImageWrapper, CardImage, CardContent } from './Card.css';

interface CardProps {
  href?: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export const Card = ({ href, imageUrl, imageAlt, title, description, children }: CardProps) => {
  const content = (
    <CardContainer>
      <CardImageWrapper>
        <CardImage
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
        />
      </CardImageWrapper>
      <CardContent>
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </CardContent>
    </CardContainer>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return content;
}; 