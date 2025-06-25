import React from 'react';
import RestaurantCarouselSection from '../RestaurantCarouselSection';

type RestaurantSectionProps = {
    title?: string;
    subtitle?: string;
    className?: string;
};

export default function RestaurantSection({
    title = 'Nuestros Restaurantes',
    subtitle = 'Descubre nuestros espacios únicos',
    className
}: RestaurantSectionProps) {
    return (
        <div className={className}>
            <RestaurantCarouselSection
                title={title}
                subtitle={subtitle}
                text="Explora nuestros restaurantes y descubre una experiencia gastronómica única"
                actions={[
                    {
                        label: 'Reserva Ahora',
                        url: '#contacto',
                        style: 'primary'
                    }
                ]}
                media={{
                    url: '/images/ogrelo-01.jpeg',
                    altText: 'Nuestro restaurante principal'
                }}
            />
        </div>
    );
}
