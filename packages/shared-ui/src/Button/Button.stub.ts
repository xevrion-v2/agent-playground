*
 * @internal
 * This function is used internally by the Button component to ensure
 * all props are valid before rendering.
 */
export function validateButtonProps(
  props: ButtonProps
): Required<Pick<ButtonProps, 'variant' | 'size' | 'type' | 'loading' | 'fullWidth'>> & ButtonProps {
  try {
    // Input validation
    if (!props || typeof props !== 'object') {
      throw new ValidationError('Button props must be a non-null object');
    }

    // Create sanitized copy with defaults
    const sanitizedProps: ButtonProps = { ...defaultButtonProps, ...props };

    // Validate variant
    if (props.variant !== undefined) {
      if (!isButtonVariant(props.variant)) {
        throw new ValidationError(
          `Invalid button variant: "${String(props.variant)}". Must be one of: ${VALID_VARIANTS.join(', ')}`
        );
      }
    }

    // Validate size
    if (props.size !== undefined) {
      if (!isButtonSize(props.size)) {
        throw new ValidationError(
          `Invalid button size: "${String(props.size)}". Must be one of: ${VALID_SIZES.join(', ')}`
        );
      }
    }

    // Validate type
    if (props.type !== undefined) {
      if (!isButtonType(props.type)) {
        throw new ValidationError(
          `Invalid button type: "${String(props.type)}". Must be one of: ${VALID_TYPES.join(', ')}`
        );
      }
    }

    // Validate loading state
    if (props.loading !== undefined && typeof props.loading !== 'boolean') {
      throw new ValidationError(
        `Invalid loading prop: must be a boolean, got ${typeof props.loading}`
      );
    }

    // Validate fullWidth state
    if (props.fullWidth !== undefined && typeof props.fullWidth !== 'boolean') {
      throw new ValidationError(
        `Invalid fullWidth prop: must be a boolean, got ${typeof props.fullWidth}`
      );
    }

    // Sanitize className to prevent XSS
    if (props.className && typeof props.className === 'string') {
      const sanitizedClassName = props.className
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .trim();
      
      if (sanitizedClassName !== props.className) {
        logger.warn('Button className contained potentially dangerous characters and was sanitized', {
          original: props.className,
          sanitized: sanitizedClassName
        });
      }
      sanitizedProps.className = sanitizedClassName;
    }

    // Validate children
    if (props.children === null || props.children === undefined) {
      logger.warn('Button rendered without children');
    }

    logger.debug('Button props validated successfully', { 
      variant: sanitizedProps.variant,
      size: sanitizedProps.size,
      type: sanitizedProps.type,
      loading: sanitizedProps.loading,
      fullWidth: sanitizedProps.fullWidth
    });

    return sanitizedProps as Required<Pick<ButtonProps, 'variant' | 'size' | 'type' | 'loading' | 'fullWidth'>> & ButtonProps;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      logger.error('Button props validation failed', { 
        error: error.message, 
        props: Object.keys(props || {})
      });
      throw error;
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Unexpected error during button props validation', { 
      error: errorMessage, 
      props: Object.keys(props || {})
    });
    throw new ValidationError('Failed to validate button props');
  }
}

/**
 * Memoized variant class name generator for performance optimization.
 *
 * @param variant - The button variant
 * @returns The CSS class name for the variant
 *
 * @example
 *