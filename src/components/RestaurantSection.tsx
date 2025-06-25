import React from 'react';
import RestaurantCarouselSection from '../sections/RestaurantCarouselSection';

export default function RestaurantSection() {
  return (
    <RestaurantCarouselSection
      title="Restaurantes"
      subtitle="KatasCristal ofrece un servicio de limpieza general de restaurantes"
      text="Servicio de limpieza general de restaurantes (salones, cocinas, campanas, terrazas). Mensual, trimestral, o cada tal x tiempo..."
      actions={[
        {
          label: 'Contactanos',
          url: 'https://wa.me/34611311905',
          style: 'primary'
        }
      ]}
      media={[{
        url: '/images/ogrelo-01.jpeg',
        altText: 'Restaurante KatasCristal'
      }]}
    />
  );
}
