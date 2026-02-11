import styles from './StarBorder.module.css';

const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = 'white',
  speed = '3.5s',
  thickness = 2,
  children,
  ...rest
}) => {
  return (
    <Component
      className={`${styles.container} ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...rest.style
      }}
      {...rest}
    >
      <div
        className={styles.borderGradientBottom}
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className={styles.borderGradientTop}
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div className={styles.innerContent}>{children}</div>
    </Component>
  );
};

export default StarBorder;
