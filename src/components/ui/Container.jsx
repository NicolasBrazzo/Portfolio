export function Container({ children, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={`w-full mx-auto px-(--section-padding-x) max-w-(--container-max) ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  )
}
