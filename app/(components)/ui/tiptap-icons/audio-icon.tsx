import * as React from "react"

export const AudioIcon = React.memo(
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
          d="M3 9v6h4l5 5V4L7 9H3z"
          fill="currentColor"
        />
        <path
          d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"
          fill="currentColor"
        />
      </svg>
    )
  }
)

AudioIcon.displayName = "AudioIcon"