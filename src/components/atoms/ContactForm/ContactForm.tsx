import * as React from 'react';
import classNames from 'classnames';

type ContactFormProps = {
    className?: string;
    enableAnnotations?: boolean;
};

export default function ContactForm({ className, enableAnnotations }: ContactFormProps) {
    const [formData, setFormData] = React.useState({
        name: '',
        phone: '',
        email: '',
        services: [] as string[],
        specialRequests: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitStatus, setSubmitStatus] = React.useState<{ success: boolean; message: string } | null>(null);

    const serviceOptions = [
        'Servicio doméstico',
        'Empleadas del hogar',
        'Limpieza generales',
        'Limpieza fin de obra',
        'Limpieza de cristales',
        'Limpieza de comunidades',
        'Restaurantes'
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            services: checked
                ? [...prev.services, value]
                : prev.services.filter(service => service !== value)
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const form = e.currentTarget;
        const formData = new FormData(form);
        
        // Add services as a comma-separated string
        const services = Array.from(
            form.querySelectorAll('input[name="services"]:checked')
        ).map((el: HTMLInputElement) => el.value);
        formData.set('services', services.join(', '));
        
        // Add form-name for Netlify
        formData.set('form-name', 'contact');
        
        try {
            const response = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData as any).toString()
            });

            if (response.ok) {
                setSubmitStatus({
                    success: true,
                    message: '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.'
                });
                // Reset form
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    services: [],
                    specialRequests: ''
                });
            } else {
                throw new Error('Error al enviar el formulario');
            }
        } catch (error) {
            setSubmitStatus({
                success: false,
                message: 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.'
            });
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={classNames('contact-form', className)} data-sb-object-id={enableAnnotations ? 'contact-form' : undefined}>
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Contáctanos</h3>
                <p className="text-gray-600">¿En qué podemos ayudarte hoy?</p>
            </div>
            {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg text-sm ${submitStatus.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    {submitStatus.message}
                </div>
            )}
            <form 
                name="contact" 
                method="POST" 
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-4"
                action="/contact"
                netlify-honeypot="bot-field"
            >
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Número de teléfono *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Correo electrónico *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    <div>
                        <p className="block text-sm font-medium text-gray-700 mb-2">Servicio de interés *</p>
                        <div className="space-y-2">
                            {serviceOptions.map((service) => (
                                <div key={service} className="flex items-center">
                                    <input
                                        id={`service-${service}`}
                                        name="services"
                                        type="checkbox"
                                        value={service}
                                        checked={formData.services.includes(service)}
                                        onChange={handleCheckboxChange}
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                        required={formData.services.length === 0}
                                    />
                                    <label htmlFor={`service-${service}`} className="ml-2 block text-sm text-gray-700">
                                        {service}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                            Solicitudes Especiales
                        </label>
                        <textarea
                            id="specialRequests"
                            name="specialRequests"
                            rows={3}
                            value={formData.specialRequests}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Por favor, indícanos cualquier solicitud especial o información adicional que debamos conocer."
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-lg text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200 transform hover:scale-[1.02] active:scale-100"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Enviando...
                                </>
                            ) : (
                                'Enviar mensaje'
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
