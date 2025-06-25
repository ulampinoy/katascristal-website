import * as React from 'react';
import classNames from 'classnames';
import { mapStylesToClassNames as mapStyles } from '../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../utils/get-data-attrs';
import RestaurantCarousel from '../../components/RestaurantCarousel';

type RestaurantCarouselSectionProps = {
    elementId?: string;
    className?: string;
    colors?: string;
    styles?: {
        margin?: any;
        padding?: any;
    };
    backgroundImage?: any;
    title?: string;
    subtitle?: string;
    text?: string;
    actions?: Array<{
        label: string;
        url: string;
        style: string;
        altText?: string;
        icon?: string | React.ReactNode;
        showIcon?: boolean;
        iconPosition?: 'left' | 'right';
        elementId?: string;
    }>;
    media?: Array<{
        url: string;
        altText: string;
    }>;
};

export default function RestaurantCarouselSection(props: RestaurantCarouselSectionProps) {
    const { 
        elementId, 
        className, 
        colors = 'bg-light-fg-dark', 
        styles = {},
        backgroundImage,
        title, 
        subtitle, 
        text, 
        actions, 
        media 
    } = props;
    
    // Process images from media prop or use fallback
    const carouselImages = media?.length > 0 
        ? media.map(item => ({
              src: item.url,
              alt: item.altText || 'Restaurante'
          }))
        : [
              {
                  src: '/images/ogrelo-01.jpeg',
                  alt: 'Restaurante Ogrelo - Vista interior',
              },
              {
                  src: '/images/ogrelo-02.jpeg',
                  alt: 'Restaurante Ogrelo - Vista general',
              },
              {
                  src: '/images/ogrelo-03.jpeg',
                  alt: 'Restaurante Ogrelo - Barra principal',
              },
          ];
          
    console.log('Carousel Images:', carouselImages); // Debug log

    return (
        <div
            id={elementId}
            className={classNames(
                'sb-component',
                'sb-component-section',
                className,
                colors,
                'relative',
                styles?.margin ? mapStyles({ margin: styles?.margin }) : undefined,
                styles?.padding ? mapStyles({ padding: styles?.padding }) : 'px-4 py-12'
            )}
            {...getDataAttrs(props)}
        >
            {backgroundImage && (
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage.url})` }}
                />
            )}
            <div className="w-full max-w-7xl mx-auto relative">
                <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-12">
                    <div className="w-full max-w-[27.5rem]">
                        {title && <h2 className="text-3xl font-bold text-dark mb-4">{title}</h2>}
                        {subtitle && <p className="text-lg sm:text-xl text-gray-700 mb-6">{subtitle}</p>}
                        {text && (
                            <div className="prose prose-lg text-gray-600 mb-8" dangerouslySetInnerHTML={{ __html: text }} />
                        )}
                        <div className="flex flex-wrap gap-4 mt-6">
                            {actions?.map((action, actionIndex) => {
                                const isPrimary = action.style === 'primary';
                                const isWhatsApp = action.label.includes('WhatsApp');
                                const isPhone = action.label.includes('Llamar');
                                const isEmail = action.label.includes('Presupuesto');
                                
                                return (
                                    <a
                                        key={actionIndex}
                                        href={action.url}
                                        className={classNames(
                                            'inline-flex items-center px-6 py-3 text-base font-medium rounded-md transition-colors duration-200',
                                            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                                            {
                                                'text-white bg-primary-600 hover:bg-primary-700': isPrimary,
                                                'text-gray-700 bg-white hover:bg-gray-50 border border-gray-300': !isPrimary,
                                                'bg-[#25D366] hover:bg-[#128C7E] text-white': isWhatsApp,
                                                'bg-green-600 hover:bg-green-700 text-white': isPhone,
                                                'bg-blue-600 hover:bg-blue-700 text-white': isEmail
                                            }
                                        )}
                                        target={action.url.startsWith('http') ? '_blank' : undefined}
                                        rel={action.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        aria-label={action.altText || action.label}
                                    >
                                        {action.icon && (
                                            <span className="mr-2" aria-hidden="true">
                                                {action.icon}
                                            </span>
                                        )}
                                        {action.label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-full lg:w-[57.5%] flex-shrink-0">
                        <RestaurantCarousel images={carouselImages} />
                    </div>
                </div>
            </div>
        </div>
    );
}
