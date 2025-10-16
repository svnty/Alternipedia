import * as React from "react"

export const BlockquoteIcon = React.memo(
  ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
    return (
      <svg
        width="24"
        height="24"
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M14 17h3l2-4V7h-6v6h3M6 17h3l2-4V7H5v6h3l-2 4z"
          fill="currentColor"
        />
      </svg>
    )
  }
)

BlockquoteIcon.displayName = "BlockquoteIcon"
