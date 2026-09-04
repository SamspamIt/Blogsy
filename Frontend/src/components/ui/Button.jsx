import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon = null,
    iconPosition = 'right',
    loading = false,
    fullWidth = false,
    disabled = false,
    className = '',
    as,
    to,
    href,
    type = 'button',
    onClick,
    ...props
}) => {
    // Base styles: consistent line height, inline flex, center alignment, smooth transition
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ink/20 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-xl';

    // Variant styles
    const variants = {
        primary: 'bg-ink text-cream hover:bg-ink/85 active:scale-[0.98] shadow-xs border border-transparent',
        secondary: 'bg-ink/10 text-ink hover:bg-ink/15 active:scale-[0.98] border border-transparent',
        outline: 'border border-ink/20 text-ink bg-transparent hover:bg-ink hover:text-cream active:scale-[0.98]',
        ghost: 'text-ink bg-transparent hover:bg-ink/5 active:scale-[0.98] border border-transparent',
        danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] shadow-xs border border-transparent',
    };

    // Size variants with standard heights, padding, font sizes, and icon gaps
    const sizes = {
        sm: 'h-9 px-3.5 text-xs gap-1.5',
        md: 'h-11 px-5 text-sm gap-2',
        lg: 'h-12 px-6 text-base gap-2.5',
    };

    // Scaled icon sizes for visual harmony
    const iconSizes = {
        sm: 15,
        md: 18,
        lg: 20,
    };

    const widthClass = fullWidth ? 'w-full flex' : '';
    const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${widthClass} ${className}`.trim();

    const currentIconSize = iconSizes[size] || 18;

    const renderContent = () => (
        <>
            {loading ? (
                <Loader2 size={currentIconSize} className="animate-spin shrink-0" />
            ) : (
                Icon && iconPosition === 'left' && (
                    typeof Icon === 'function' || typeof Icon === 'object' && Icon.render ? (
                        <Icon size={currentIconSize} className="shrink-0" />
                    ) : (
                        <span className="shrink-0 flex items-center justify-center">{Icon}</span>
                    )
                )
            )}

            {children && <span>{children}</span>}

            {!loading && Icon && iconPosition === 'right' && (
                typeof Icon === 'function' || typeof Icon === 'object' && Icon.render ? (
                    <Icon size={currentIconSize} className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                ) : (
                    <span className="shrink-0 flex items-center justify-center">{Icon}</span>
                )
            )}
        </>
    );

    if (to) {
        return (
            <Link to={to} className={combinedClasses} {...props}>
                {renderContent()}
            </Link>
        );
    }

    if (href || as === 'a') {
        return (
            <a href={href} className={combinedClasses} {...props}>
                {renderContent()}
            </a>
        );
    }

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={combinedClasses}
            {...props}
        >
            {renderContent()}
        </button>
    );
};

export default Button;
