import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Social, Action, Link } from '../../atoms';
import ImageBlock from '../../blocks/ImageBlock';
import ContactForm from '../../atoms/ContactForm';

export default function Footer(props) {
    const {
        colors = 'bg-light-fg-dark',
        logo,
        title,
        text,
        primaryLinks,
        secondaryLinks,
        socialLinks = [],
        legalLinks = [],
        copyrightText,
        styles = {},
        enableAnnotations
    } = props;
    return (
        <footer
            className={classNames(
                'sb-component',
                'sb-component-footer',
                colors,
                styles?.self?.margin ? mapStyles({ padding: styles?.self?.margin }) : undefined,
                styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : 'px-4 py-16'
            )}
            {...(enableAnnotations && { 'data-sb-object-id': props?.__metadata?.id })}
        >
            <div className="px-4 mx-auto max-w-4xl sm:px-6">
                {/* Contact Form - Full width */}
                <div className="mb-16">
                    <ContactForm className="p-8 w-full bg-white rounded-lg border border-gray-200 shadow-xl" enableAnnotations={enableAnnotations} />
                </div>

                {/* Company Info and Social Links */}
                <div className="space-y-10 text-gray-100">
                    {(logo?.url || title || text) && (
                        <div className="text-center">
                            {(logo?.url || title) && (
                                <Link href="/" className="flex flex-col items-center group">
                                    {logo && (
                                        <div className="p-2 mb-4 bg-white bg-opacity-10 rounded-lg">
                                            <ImageBlock
                                                {...logo}
                                                className="inline-block w-auto h-10 brightness-0 invert md:h-12"
                                                {...(enableAnnotations && { 'data-sb-field-path': 'logo' })}
                                            />
                                        </div>
                                    )}
                                    {title && (
                                        <h2
                                            className="mb-4 text-2xl font-bold text-white transition-colors md:text-3xl group-hover:text-primary-300"
                                            {...(enableAnnotations && { 'data-sb-field-path': 'title' })}
                                        >
                                            {title}
                                        </h2>
                                    )}
                                </Link>
                            )}
                            {text && (
                                <div className="mx-auto space-y-6 max-w-2xl">
                                    <Markdown
                                        options={{ forceBlock: true, forceWrapper: true }}
                                        className={classNames('sb-markdown', 'text-base md:text-lg leading-relaxed text-gray-200', {
                                            'mt-2': title || logo?.url
                                        })}
                                        {...(enableAnnotations && { 'data-sb-field-path': 'text' })}
                                    >
                                        {text}
                                    </Markdown>
                                    {socialLinks.length > 0 && (
                                        <div className="mt-10">
                                            <ul
                                                className="flex flex-wrap gap-8 justify-center items-center"
                                                {...(enableAnnotations && { 'data-sb-field-path': 'socialLinks' })}
                                            >
                                                {socialLinks.map((link, index) => (
                                                    <li key={index}>
                                                        <Social
                                                            {...link}
                                                            className="text-3xl text-white transition-colors hover:text-primary-300"
                                                            {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })}
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Navigation Links */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {primaryLinks && (
                            <FooterLinksGroup
                                {...primaryLinks}
                                className="text-gray-200"
                                linkClassName="text-gray-300 hover:text-white transition-colors"
                                {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}
                            />
                        )}
                        {secondaryLinks && (
                            <FooterLinksGroup
                                {...secondaryLinks}
                                className="text-gray-200"
                                linkClassName="text-gray-300 hover:text-white transition-colors"
                                {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}
                            />
                        )}
                    </div>
                </div>
                {(copyrightText || legalLinks.length > 0) && (
                    <div className="flex flex-col pt-8 mt-16 border-t sb-footer-bottom sm:flex-row sm:flex-wrap sm:justify-between">
                        {legalLinks.length > 0 && (
                            <ul className="flex flex-wrap mb-3" {...(enableAnnotations && { 'data-sb-field-path': 'legalLinks' })}>
                                {legalLinks.map((link, index) => (
                                    <li key={index} className="mr-6 mb-1 last:mr-0">
                                        <Action {...link} className="text-sm" {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })} />
                                    </li>
                                ))}
                            </ul>
                        )}
                        {copyrightText && (
                            <Markdown
                                options={{ forceInline: true, forceWrapper: true, wrapper: 'p' }}
                                className={classNames('sb-markdown', 'text-sm', 'mb-4', { 'sm:order-first sm:mr-12': legalLinks.length > 0 })}
                                {...(enableAnnotations && { 'data-sb-field-path': 'copyrightText' })}
                            >
                                {copyrightText}
                            </Markdown>
                        )}
                    </div>
                )}
            </div>
        </footer>
    );
}

function FooterLinksGroup(props) {
    const { title, links = [] } = props;
    const fieldPath = props['data-sb-field-path'];
    if (links.length === 0) {
        return null;
    }
    return (
        <div className="pb-8" data-sb-field-path={fieldPath}>
            {title && (
                <h2 className="text-base tracking-wide uppercase" {...(fieldPath && { 'data-sb-field-path': '.title' })}>
                    {title}
                </h2>
            )}
            {links.length > 0 && (
                <ul className={classNames('space-y-3', { 'mt-7': title })} {...(fieldPath && { 'data-sb-field-path': '.links' })}>
                    {links.map((link, index) => (
                        <li key={index}>
                            <Action {...link} className="text-sm" {...(fieldPath && { 'data-sb-field-path': `.${index}` })} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
